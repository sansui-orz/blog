/** 抄作业 */

  /**
   *正交投影矩阵
   *
   * @param {*} left
   * @param {*} right
   * @param {*} bottom
   * @param {*} top
   * @param {*} near
   * @param {*} far
   * @param {*} target
   * @returns
   */
  function ortho(left, right, bottom, top, near, far, target) {
    target = target || new Float32Array(16);

    target[0] = 2 / (right - left);
    target[1] = 0;
    target[2] = 0;
    target[3] = 0;

    target[4] = 0;
    target[5] = 2 / (top - bottom);
    target[6] = 0;
    target[7] = 0;

    target[8] = 0;
    target[9] = 0;
    target[10] = 2 / (near - far);
    target[11] = 0;

    target[12] = (left + right) / (left - right);
    target[13] = (bottom + top) / (bottom - top);
    target[14] = (near + far) / (near - far);
    target[15] = 1;

    return target;
  }

	var deg2radian = Math.PI / 180;
  function deg2radians(deg) {
	  return deg2radian * deg;
  }
  
  /**
   *单位矩阵
   *
   * @param {*} target
   */
  function identity(target) {
    target = target || new Float32Array(16);
    for (var i = 0; i < 16; i++) {
      if (i % 5 == 0) {
        target[i] = 1;
      } else {
        target[i] = 0;
      }
    }
    return target;
  }

   /**
   *饶 Y 轴旋转矩阵。
   *
   * @param {*} angle
   * @param {*} target
   * @returns
   */
  function rotationY(angle, target) {
    target = target || new Float32Array(16);
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    target[0] = cos;
    target[1] = 0;
    target[2] = -sin;
    target[3] = 0;
    target[4] = 0;
    target[5] = 1;
    target[6] = 0;
    target[7] = 0;
    target[8] = sin;
    target[9] = 0;
    target[10] = cos;
    target[11] = 0;
    target[12] = 0;
    target[13] = 0;
    target[14] = 0;
    target[15] = 1;

    return target;
  }

 /**
   *饶 X 轴旋转矩阵
   *
   * @param {*} angle
   * @param {*} target
   * @returns
   */
  function rotationX(angle, target) {
    target = target || new Float32Array(16);
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    target[0] = 1;
    target[1] = 0;
    target[2] = 0;
    target[3] = 0;
    target[4] = 0;
    target[5] = cos;
    target[6] = sin;
    target[7] = 0;
    target[8] = 0;
    target[9] = -sin;
    target[10] = cos;
    target[11] = 0;
    target[12] = 0;
    target[13] = 0;
    target[14] = 0;
    target[15] = 1;

    return target;
  }

  /**
   *矩阵相乘  next * prev;
   *
   * @param {*} next
   * @param {*} prev
   * @param {*} target
   * @returns
   */
  function multiply(next, prev, target) {
    target = target || new Float32Array(16);
    // 第一列
    var p00 = prev[0];
    var p10 = prev[1];
    var p20 = prev[2];
    var p30 = prev[3];
    // 第二列
    var p01 = prev[4];
    var p11 = prev[5];
    var p21 = prev[6];
    var p31 = prev[7];
    // 第三列
    var p02 = prev[8];
    var p12 = prev[9];
    var p22 = prev[10];
    var p32 = prev[11];

    // 第四列
    var p03 = prev[12];
    var p13 = prev[13];
    var p23 = prev[14];
    var p33 = prev[15];

    // 第一行
    var n00 = next[0];
    var n01 = next[4];
    var n02 = next[8];
    var n03 = next[12];
    // 第二行
    var n10 = next[1];
    var n11 = next[5];
    var n12 = next[9];
    var n13 = next[13];
    // 第三行
    var n20 = next[2];
    var n21 = next[6];
    var n22 = next[10];
    var n23 = next[14];

    // 第四行
    var n30 = next[3];
    var n31 = next[7];
    var n32 = next[11];
    var n33 = next[15];

    target[0] = p00 * n00 + p10 * n01 + p20 * n02 + p30 * n03;
    target[1] = p00 * n10 + p10 * n11 + p20 * n12 + p30 * n13;
    target[2] = p00 * n20 + p10 * n21 + p20 * n22 + p30 * n23;
    target[3] = p00 * n30 + p10 * n31 + p20 * n32 + p30 * n33;

    target[4] = p01 * n00 + p11 * n01 + p21 * n02 + p31 * n03;
    target[5] = p01 * n10 + p11 * n11 + p21 * n12 + p31 * n13;
    target[6] = p01 * n20 + p11 * n21 + p21 * n22 + p31 * n23;
    target[7] = p01 * n30 + p11 * n31 + p21 * n32 + p31 * n33;

    target[8] = p02 * n00 + p12 * n01 + p22 * n02 + p32 * n03;
    target[9] = p02 * n10 + p12 * n11 + p22 * n12 + p32 * n13;
    target[10] = p02 * n20 + p12 * n21 + p22 * n22 + p32 * n23;
    target[11] = p02 * n30 + p12 * n31 + p22 * n32 + p32 * n33;

    target[12] = p03 * n00 + p13 * n01 + p23 * n02 + p33 * n03;
    target[13] = p03 * n10 + p13 * n11 + p23 * n12 + p33 * n13;
    target[14] = p03 * n20 + p13 * n21 + p23 * n22 + p33 * n23;
    target[15] = p03 * n30 + p13 * n31 + p23 * n32 + p33 * n33;

    return target;
  }

  /**
   *视图矩阵
   *
   * @param {*} cameraPosition，摄像机坐标
   * @param {*} target，观察点坐标
   * @param {*} upDirection，初始Y轴基向量
   * @param {*} target
   * @returns
   */
  function lookAt(cameraPosition, lookTarget, upDirection, target) {
    var target = target || new Float32Array(16);
    let zAxis = Vector3.normalize(
      Vector3.subtractVectors(cameraPosition, lookTarget)
    );
    // 如果摄像机位置和目标位置处于同一点
    if (zAxis.lengthSquare() === 0) {
      zAxis.z = 1;
    }

    let xAxis = Vector3.normalize(Vector3.cross(upDirection, zAxis));
    if (xAxis.length() == 0) {
      if (Math.abs(upDirection.z == 1)) {
        zAxis.x += 0.0001;
      } else {
        zAxis.z += 0.0001;
      }
      zAxis.normalize();
      xAxis = Vector3.cross(upDirection, zAxis);
      xAxis.normalize();
    }
    let yAxis = Vector3.normalize(Vector3.cross(zAxis, xAxis));

    //第一列
    target[0] = xAxis.x;
    target[1] = xAxis.y;
    target[2] = xAxis.z;
    target[3] = 0;
    //第二列
    target[4] = yAxis.x;
    target[5] = yAxis.y;
    target[6] = yAxis.z;
    target[7] = 0;
    //第三列
    target[8] = zAxis.x;
    target[9] = zAxis.y;
    target[10] = zAxis.z;
    target[11] = 0;
    //第四列
    target[12] = cameraPosition.x;
    target[13] = cameraPosition.y;
    target[14] = cameraPosition.z;
    target[15] = 1;

    return target;
  }

  /**
   *逆矩阵
   *
   * @param {*} m
   * @param {*} target
   * @returns
   */
  function inverse(m, target) {
    var n11 = m[0],
      n21 = m[1],
      n31 = m[2],
      n41 = m[3],
      n12 = m[4],
      n22 = m[5],
      n32 = m[6],
      n42 = m[7],
      n13 = m[8],
      n23 = m[9],
      n33 = m[10],
      n43 = m[11],
      n14 = m[12],
      n24 = m[13],
      n34 = m[14],
      n44 = m[15],
      t11 =
        n23 * n34 * n42 -
        n24 * n33 * n42 +
        n24 * n32 * n43 -
        n22 * n34 * n43 -
        n23 * n32 * n44 +
        n22 * n33 * n44,
      t12 =
        n14 * n33 * n42 -
        n13 * n34 * n42 -
        n14 * n32 * n43 +
        n12 * n34 * n43 +
        n13 * n32 * n44 -
        n12 * n33 * n44,
      t13 =
        n13 * n24 * n42 -
        n14 * n23 * n42 +
        n14 * n22 * n43 -
        n12 * n24 * n43 -
        n13 * n22 * n44 +
        n12 * n23 * n44,
      t14 =
        n14 * n23 * n32 -
        n13 * n24 * n32 -
        n14 * n22 * n33 +
        n12 * n24 * n33 +
        n13 * n22 * n34 -
        n12 * n23 * n34;

    var determinant = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

    if (determinant === 0) {
      var msg = "inverse() can't invert m, determinant is 0";
      console.warn(msg);
      return identity();
    }
    target = target || new Float32Array(16);
    var detInv = 1 / determinant;

    target[0] = t11 * detInv;
    target[1] =
      (n24 * n33 * n41 -
        n23 * n34 * n41 -
        n24 * n31 * n43 +
        n21 * n34 * n43 +
        n23 * n31 * n44 -
        n21 * n33 * n44) *
      detInv;
    target[2] =
      (n22 * n34 * n41 -
        n24 * n32 * n41 +
        n24 * n31 * n42 -
        n21 * n34 * n42 -
        n22 * n31 * n44 +
        n21 * n32 * n44) *
      detInv;
    target[3] =
      (n23 * n32 * n41 -
        n22 * n33 * n41 -
        n23 * n31 * n42 +
        n21 * n33 * n42 +
        n22 * n31 * n43 -
        n21 * n32 * n43) *
      detInv;

    target[4] = t12 * detInv;
    target[5] =
      (n13 * n34 * n41 -
        n14 * n33 * n41 +
        n14 * n31 * n43 -
        n11 * n34 * n43 -
        n13 * n31 * n44 +
        n11 * n33 * n44) *
      detInv;
    target[6] =
      (n14 * n32 * n41 -
        n12 * n34 * n41 -
        n14 * n31 * n42 +
        n11 * n34 * n42 +
        n12 * n31 * n44 -
        n11 * n32 * n44) *
      detInv;
    target[7] =
      (n12 * n33 * n41 -
        n13 * n32 * n41 +
        n13 * n31 * n42 -
        n11 * n33 * n42 -
        n12 * n31 * n43 +
        n11 * n32 * n43) *
      detInv;

    target[8] = t13 * detInv;
    target[9] =
      (n14 * n23 * n41 -
        n13 * n24 * n41 -
        n14 * n21 * n43 +
        n11 * n24 * n43 +
        n13 * n21 * n44 -
        n11 * n23 * n44) *
      detInv;
    target[10] =
      (n12 * n24 * n41 -
        n14 * n22 * n41 +
        n14 * n21 * n42 -
        n11 * n24 * n42 -
        n12 * n21 * n44 +
        n11 * n22 * n44) *
      detInv;
    target[11] =
      (n13 * n22 * n41 -
        n12 * n23 * n41 -
        n13 * n21 * n42 +
        n11 * n23 * n42 +
        n12 * n21 * n43 -
        n11 * n22 * n43) *
      detInv;

    target[12] = t14 * detInv;
    target[13] =
      (n13 * n24 * n31 -
        n14 * n23 * n31 +
        n14 * n21 * n33 -
        n11 * n24 * n33 -
        n13 * n21 * n34 +
        n11 * n23 * n34) *
      detInv;
    target[14] =
      (n14 * n22 * n31 -
        n12 * n24 * n31 -
        n14 * n21 * n32 +
        n11 * n24 * n32 +
        n12 * n21 * n34 -
        n11 * n22 * n34) *
      detInv;
    target[15] =
      (n12 * n23 * n31 -
        n13 * n22 * n31 +
        n13 * n21 * n32 -
        n11 * n23 * n32 -
        n12 * n21 * n33 +
        n11 * n22 * n33) *
      detInv;

    return target;
  }

  /**
   *根据视角求透视投影矩阵
   *
   * @param {*} viewRadians
   * @param {*} aspect
   * @param {*} near
   * @param {*} far
   * @param {*} target
   * @returns
   */
  function perspective(viewRadians, aspect, near, far, target) {
    //投影盒上边坐标
    var top = near * Math.tan(Math.PI / 180) * 0.5 * viewRadians;
    //投影盒高度
    var height = 2 * top;
    //投影盒宽度
    var width = aspect * height;
    //投影盒左边界坐标
    var left = -0.5 * width;
    return perspectiveOfRect(
      left,
      left + width,
      top,
      top - height,
      near,
      far,
      target
    );
  }

  /**
   *求透视投影矩阵
   *
   * @param {*} left
   * @param {*} right
   * @param {*} top
   * @param {*} bottom
   * @param {*} near
   * @param {*} far
   * @param {*} target
   * @returns
   */
  function perspectiveOfRect(left, right, top, bottom, near, far, target) {
    target = target || new Float32Array(16);
    var x = (2 * near) / (right - left);
    var y = (2 * near) / (top - bottom);
    var a = (right + left) / (right - left);
    var b = (top + bottom) / (top - bottom);
    var c = -(far + near) / (far - near);
    var d = (-2 * far * near) / (far - near);

    target[0] = x;
    target[1] = 0;
    target[2] = 0;
    target[3] = 0;

    target[4] = 0;
    target[5] = y;
    target[6] = 0;
    target[3] = 0;

    target[8] = a;
    target[9] = b;
    target[10] = c;
    target[11] = -1;

    target[12] = 0;
    target[13] = 0;
    target[14] = d;
    target[15] = 0;

    return target;
  }

  /*3维向量构造函数
 *
 * @param {*} x
 * @param {*} y
 * @param {*} z
 */
function Vector3(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

/**
 *设置第一个分量
 *
 * @param {*} x
 */

Vector3.prototype.setX = function(x) {
  this.x = x || 0;
  return this;
};

/**
 *设置第二个分量
 *
 * @param {*} y
 */
Vector3.prototype.setY = function(y) {
  this.y = y || 0;
  return this;
};

/**
 *设置第三个分量
 *
 * @param {*} z
 */
Vector3.prototype.setZ = function(z) {
  this.z = z || 0;
  return this;
};

/**
 *设置三个分量
 *
 * @param {*} x
 * @param {*} y
 * @param {*} z
 */
Vector3.prototype.set = function(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
};

/**
 * 归一化向量
 *
 * @param {*} vec
 */
Vector3.prototype.normalize = function(vec) {
  var length = this.length();

  if (length > 0.00001) {
    this.x /= length;
    this.y /= length;
    this.z /= length;
  } else {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
  return this;
};

/**
 *向量加法
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.prototype.addVector = function(vec1, vec2) {
  this.x = vec1.x + vec2.x;
  this.y = vec1.y + vec2.y;
  this.z = vec1.z + vec2.z;
  return this;
};

/**
 *向量长度
 *
 * @param {*} vec
 */
Vector3.prototype.length = function(vec) {
  if (vec) {
    return vec.length();
  }
  return Math.sqrt(this.lengthSquare());
};

/**
 *向量长度的平方
 *
 * @param {*} vec
 */
Vector3.prototype.lengthSquare = function(vec) {
  if (vec) {
    return vec.lengthSquare();
  }
  return this.x * this.x + this.y * this.y + this.z * this.z;
};

/**
 *向量加法
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.prototype.add = function(vec1, vec2) {
  if (vec2) {
    return this.addVector(vec1, vec2);
  }
  this.x += vec1.x;
  this.y += vec1.y;
  this.z += vec1.z;
  return this;
};

/**
 *向量减法，实例方法
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.prototype.sub = function(vec1, vec2) {
  if (vec2) {
    return this.addVector(vec1, -vec2);
  }
  this.x -= vec1.x;
  this.y -= vec1.y;
  this.z -= vec1.z;
  return this;
};

/**
 *向量减法，类方法
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.subtractVectors = function(vec1, vec2) {
  return new Vector3(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);
};

/**
 *向量逐分量相乘
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.prototype.multiplyVectors = function(vec1, vec2) {
  this.x = vec1.x * vec2.x;
  this.y = vec1.y * vec2.y;
  this.z = vec1.z * vec2.z;
  return this;
};

/**
 *向量逐分量相乘
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.prototype.multiply = function(vec1, vec2) {
  if (vec2) {
    return this.multiplyVectors(vec1, vec2);
  }
  this.x *= vec1.x;
  this.y *= vec1.y;
  this.z *= vec1.z;
  return this;
};

/**
 *向量点积
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.dot = function(vec1, vec2) {
  return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
};

/**
 *向量差积
 *
 * @param {*} vec1
 * @param {*} vec2
 */
Vector3.cross = function(vec1, vec2) {
  var x = vec1.y * vec2.z - vec2.y * vec1.z;
  var y = vec2.x * vec1.z - vec1.x * vec2.z;
  var z = vec1.x * vec2.y - vec1.y * vec2.x;
  return new Vector3(x, y, z);
};

/**
 * 归一化向量
 *
 * @param {*} vec
 */
Vector3.normalize = function(vec) {
  var length = vec.length();
  if (length > 0.00001) {
    return new Vector3(vec.x / length, vec.y / length, vec.z / length);
  }
  return new Vector3();
};

function getRGBFromColor(color) {
  color = color.startsWith('#') ? color.substr(1) : color;
  var hex = color.split('');
  var r = parseInt(hex[0], 16) * 16 + parseInt(hex[1], 16);
  var g = parseInt(hex[2], 16) * 16 + parseInt(hex[3], 16);
  var b = parseInt(hex[4], 16) * 16 + parseInt(hex[5], 16);
  return {
    r: r,
    g: g,
    b: b
  };
}

//模型类
function Model(name, isDraw) {
  this.uniforms = {};
  this.u_Matrix = null;
  this.bufferInfo = {};
  this.parent = null;
  this.children = [];
  this.rotation = [0, 0, 0];
  this.translation = [0, 0, 0];
  this.scalation = [1, 1, 1];
  this.origination = [0, 0, 0];
  if (isDraw === false) {
    this.isDraw = isDraw;
  } else {
    this.isDraw = true;
  }

  this.name = name || '未命名';
  this.localMatrix = matrix.identity();
  this.worldMatrix = matrix.identity();
}
Model.prototype.setParent = function(parent) {
  // 若当前模型有父节点，从父节点中移除
  if (this.parent) {
    let index = this.parent.children.indexOf(this);
    if (index >= 0) {
      this.parent.children.splice(index, 1);
    }
  }
  // 将模型添加到指定 parent 节点的子列表尾部。
  if (parent) {
    parent.children.push(this);
  }
  this.parent = parent || null;
};
Model.prototype.updateLocalMatrix = function(newMatrix) {
  matrix.multiply(newMatrix, this.localMatrix, this.localMatrix);
};
Model.prototype.updateWorldMatrix = function(
  newMatrix,
  viewMatrix,
  projectionMatrix
) {
  this.getWorldMatrix(this.worldMatrix);
  this.u_ModelMatrix = this.worldMatrix;
  this.uniforms.u_ModelMatrix = this.u_ModelMatrix;
  this.uniforms.u_Matrix = matrix.multiply(viewMatrix, this.u_ModelMatrix);
  this.uniforms.u_Matrix = matrix.multiply(
    projectionMatrix,
    this.uniforms.u_Matrix
  );
};
Model.prototype.setBufferInfo = function(bufferInfo) {
  this.bufferInfo = bufferInfo || {};
};
Model.prototype.setOrigin = function(ox, oy, oz) {
  if (Array.isArray(ox)) {
    this.origination = [ox[0] || 0, ox[1] || 0, ox[2] || 0];
    return;
  }
  this.origination = [ox || 0, oy || 0, oz || 0];
};
Model.prototype.setUniforms = function(uniforms) {
  for (let i in uniforms) {
    this.uniforms[i] = uniforms[i];
  }
};
Model.prototype.clone = function() {
  let target = new Model(this.name);
  for (let i in this) {
    if (typeof this[i] !== 'object') {
      target[i] = this[i];
    } else {
      if (Array.isArray(this[i])) {
        target[i] = this[i].slice(0);
      } else if (this[i] && this[i].buffer instanceof ArrayBuffer) {
        target[i] = this[i].slice(0);
      } else {
        target[i] = this[i];
      }
    }
  }
  return target;
};
Model.prototype.getWorldMatrix = function(worldMatrix) {
  if (worldMatrix) {
    this.worldMatrix = matrix.multiply(
      worldMatrix,
      this.localMatrix,
      this.worldMatrix
    );
  } else {
    this.worldMatrix = this.localMatrix;
  }
  let currentWorldMatrix = this.worldMatrix;
  this.children.forEach(function(model) {
    model.getWorldMatrix(currentWorldMatrix);
  });
};
Model.prototype.translate = function(tx, ty, tz) {
  if (Array.isArray(tx)) {
    this.translateX(tx[0]);
    this.translateY(tx[1]);
    this.translateZ(tx[2]);
    return;
  }
  this.translateX(tx);
  this.translateY(ty);
  this.translateZ(tz);
};
Model.prototype.translateX = function(tx) {
  this.translation[0] = tx || 0;
};
Model.prototype.translateY = function(ty) {
  this.translation[1] = ty || 0;
};
Model.prototype.translateZ = function(tz) {
  this.translation[2] = tz || 0;
};

Model.prototype.scale = function(sx, sy, sz) {
  if (Array.isArray(sx)) {
    this.scaleX(sx[0]);
    this.scaleY(sx[1]);
    this.scaleZ(sx[2]);
    return;
  }
  this.scaleX(sx);
  this.scaleY(sy);
  this.scaleZ(sz);
};
Model.prototype.scaleX = function(sx) {
  this.scalation[0] = sx || 1;
};
Model.prototype.scaleY = function(sy) {
  this.scalation[1] = sy || 1;
};
Model.prototype.scaleZ = function(sz) {
  this.scalation[2] = sz || 1;
};

Model.prototype.rotate = function(rx, ry, rz) {
  if (Array.isArray(rx)) {
    this.rotateX(rx[0]);
    this.rotateY(rx[1]);
    this.rotateZ(rx[2]);
    return;
  }
  this.rotateX(rx);
  this.rotateY(ry);
  this.rotateZ(rz);
};
Model.prototype.rotateX = function(rx) {
  this.rotation[0] = rx || 0;
};
Model.prototype.rotateY = function(ry) {
  this.rotation[1] = ry || 0;
};
Model.prototype.rotateZ = function(rz) {
  this.rotation[2] = rz || 0;
};

function degToRadians(deg) {
  return (Math.PI / 180) * deg;
}
Model.prototype.preRender = function(viewMatrix, projectionMatrix) {
  let modelMatrix = matrix.identity(this.localMatrix);
  if (this.translation) {
    modelMatrix = matrix.translate(
      modelMatrix,
      this.translation[0],
      this.translation[1],
      this.translation[2]
    );
  }
  /*
  modelMatrix = matrix.translate(
    modelMatrix,
    this.origination[0] * this.scalation[0],
    this.origination[1] * this.scalation[1],
    this.origination[2] * this.scalation[2]
  );
*/
  if (this.rotation) {
    if (this.rotation[0] !== undefined)
      modelMatrix = matrix.rotateX(modelMatrix, degToRadians(this.rotation[0]));
    if (this.rotation[1] !== undefined)
      modelMatrix = matrix.rotateY(modelMatrix, degToRadians(this.rotation[1]));
    if (this.rotation[2] !== undefined)
      modelMatrix = matrix.rotateZ(modelMatrix, degToRadians(this.rotation[2]));
  }
  modelMatrix = matrix.translate(
    modelMatrix,
    -this.origination[0] * this.scalation[0],
    -this.origination[1] * this.scalation[1],
    -this.origination[2] * this.scalation[2]
  );
  if (this.scalation) {
    modelMatrix = matrix.scale(
      modelMatrix,
      this.scalation[0],
      this.scalation[1],
      this.scalation[2]
    );
  }

  this.localMatrix = modelMatrix;
  this.children.forEach(function(child) {
    child.preRender(viewMatrix, projectionMatrix);
  });
  if (!this.parent) {
    this.getWorldMatrix();
  }

  this.u_Matrix = matrix.multiply(viewMatrix, this.worldMatrix, this.u_Matrix);
  this.u_Matrix = matrix.multiply(
    projectionMatrix,
    this.u_Matrix,
    this.u_Matrix
  );

  this.uniforms.u_Matrix = this.u_Matrix;
  this.uniforms.u_ModelMatrix = this.worldMatrix;
};
