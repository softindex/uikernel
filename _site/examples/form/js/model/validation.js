/**
 * Copyright 2015, SoftIndex LLC.
 */
var Validation = UIKernel.createValidator()
  .field('name', UIKernel.Validators.regExp(/^\w{2,30}$/, 'Invalid first name.'))
  .field('age', UIKernel.Validators.number(15, 90, 'Age must be between 15 and 90'));