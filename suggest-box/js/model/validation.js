/**
 * Copyright 2015, SoftIndex LLC.
 */
var validation = UIKernel.createValidator()
  .field('country', UIKernel.Validators.notNull('Invalid country.'));
