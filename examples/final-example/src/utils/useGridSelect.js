/*
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useState, useEffect, useMemo} from 'react';
import {intersection, difference} from './utils';

const TOGGLE_ALL_STATUSES = {
  CHECKED: 'checked',
  UNCHECKED: 'unchecked',
  INDETERMINATE: 'indeterminate',
  LOADING: 'loading'
};

function useGridSelect(model, selected, onChange) {
  const [localSelected, changeLocalSelected] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [visibleIds, setVisibleIds] = useState([]);
  const [forceSelectAll, setForceSelectAll] = useState(false);
  const [mounted, setMounted] = useState(true);

  if (selected === undefined && onChange === undefined) {
    selected = localSelected;
    onChange = changeLocalSelected;
  }

  useEffect(() => {
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    function onModelChange() {
      model.read({fields: []})
        .then(({records}) => {
          setForceSelectAll(false);

          if (mounted) {
            setFiltered(records.map(([id]) => id));
          }
        })
        .catch(error => {
          console.error(error.message);
        });
    }
    onModelChange();

    model.on('create', onModelChange);
    model.on('delete', onModelChange);

    return () => {
      model.off('create', onModelChange);
      model.off('delete', onModelChange);
      setFiltered(null);
    };
  }, [model]);

  useEffect(() => {
    const nextSelected = intersection(selected, filtered);
    if (nextSelected.size !== selected.length) {
      onChange([...nextSelected]);
    }
  }, [selected, filtered]);

  const toggleAllStatus = useMemo(() => {
    if (!filtered) {
      return TOGGLE_ALL_STATUSES.LOADING;
    }

    if (!selected.length) {
      return forceSelectAll ? TOGGLE_ALL_STATUSES.CHECKED : TOGGLE_ALL_STATUSES.UNCHECKED;
    }

    const intersectionLength = intersection(filtered, new Set(selected)).size;
    if (intersectionLength === filtered.length) {
      return TOGGLE_ALL_STATUSES.CHECKED;
    }

    return TOGGLE_ALL_STATUSES.INDETERMINATE;
  }, [filtered, selected]);

  return {
    selected,
    toggleAllStatus,
    setVisibleIds,
    toggleSelected(id) {
      const nextSelected = new Set(selected);

      if (nextSelected.has(id)) {
        nextSelected.delete(id);
      } else {
        nextSelected.add(id);
      }

      onChange([...nextSelected]);
    },
    removeSelected(id) {
      const nextSelected = new Set(selected);
      if (!nextSelected.has(id)) {
        return;
      }

      nextSelected.delete(id);
      onChange([...nextSelected]);
    },
    toggleAll() {
      const filteredSet = new Set(filtered);
      const selectedSet = new Set(selected);
      const intersectionLength = intersection(filteredSet, selectedSet).size;

      let nextSelected;
      if (intersectionLength === filteredSet.size) {
        // Unselect filtered records if selected all filtered record
        nextSelected = difference(selected, filteredSet);
      } else {
        // Select all filtered records
        nextSelected = new Set([...selected, ...filteredSet]);
      }

      if (nextSelected.size === 0 && selected.length === 0) {
        setForceSelectAll(!forceSelectAll);
      }

      onChange([...nextSelected]);
    },
    toggleAllVisible() {
      const visibleIdsDifference = difference(visibleIds, new Set(selected));
      let nextSelected;
      if (!visibleIdsDifference.size) {
        nextSelected = difference(selected, new Set(visibleIds));
      } else {
        nextSelected = new Set([...selected, ...visibleIds]);
      }

      onChange([...nextSelected]);
    },
    unselectAll() {
      onChange([]);
    }
  };
}

export default useGridSelect;
