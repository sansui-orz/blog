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