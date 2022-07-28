"use strict";

define(function () {
  "use strict";

  return "mat2 czm_transpose(mat2 matrix)\n{\nreturn mat2(\nmatrix[0][0], matrix[1][0],\nmatrix[0][1], matrix[1][1]);\n}\nmat3 czm_transpose(mat3 matrix)\n{\nreturn mat3(\nmatrix[0][0], matrix[1][0], matrix[2][0],\nmatrix[0][1], matrix[1][1], matrix[2][1],\nmatrix[0][2], matrix[1][2], matrix[2][2]);\n}\nmat4 czm_transpose(mat4 matrix)\n{\nreturn mat4(\nmatrix[0][0], matrix[1][0], matrix[2][0], matrix[3][0],\nmatrix[0][1], matrix[1][1], matrix[2][1], matrix[3][1],\nmatrix[0][2], matrix[1][2], matrix[2][2], matrix[3][2],\nmatrix[0][3], matrix[1][3], matrix[2][3], matrix[3][3]);\n}\n";
});