"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /** @description Determines the distance between two points
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  @param {number} x0 Vertex 0 x
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  @param {number} y0 Vertex 0 y
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  @param {number} x1 Vertex 1 x
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  @param {number} y1 Vertex 1 y
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  @return {number}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


exports.compareVertices = compareVertices;
exports.minVertex = minVertex;
exports.maxVertex = maxVertex;
exports.orderVertices = orderVertices;
exports.pointsDistance = pointsDistance;
exports.verticesDistance = verticesDistance;
exports.horizontalLine = horizontalLine;
exports.verticalLine = verticalLine;
exports.linePassingThroughTwoPoints = linePassingThroughTwoPoints;
exports.distancePointFromLine = distancePointFromLine;
exports.closestPointFromLine = closestPointFromLine;
exports.intersectionFromTwoLines = intersectionFromTwoLines;
exports.intersectionFromTwoLineSegment = intersectionFromTwoLineSegment;
exports.distancePointFromLineSegment = distancePointFromLineSegment;
exports.isPointOnLineSegment = isPointOnLineSegment;
exports.closestPointFromLineSegment = closestPointFromLineSegment;
exports.pointPositionOnLineSegment = pointPositionOnLineSegment;
exports.mapRange = mapRange;
exports.angleBetweenTwoPointsAndOrigin = angleBetweenTwoPointsAndOrigin;
exports.angleBetweenTwoPoints = angleBetweenTwoPoints;
exports.samePoints = samePoints;
exports.extendLine = extendLine;
exports.roundVertex = roundVertex;

var _math = require("./math.js");

var _constants = require("../constants");

function compareVertices(v0, v1) {
  return v0.x === v1.x ? v0.y - v1.y : v0.x - v1.x;
}

function minVertex(v0, v1) {
  return compareVertices(v0, v1) > 0 ? v1 : v0;
}

function maxVertex(v0, v1) {
  return compareVertices(v0, v1) > 0 ? v0 : v1;
}

function orderVertices(vertices) {
  return vertices.sort(compareVertices);
}

function pointsDistance(x0, y0, x1, y1) {
  var diff_x = x0 - x1;
  var diff_y = y0 - y1;

  return Math.sqrt(diff_x * diff_x + diff_y * diff_y);
}

function verticesDistance(v1, v2) {
  var x0 = v1.x,
      y0 = v1.y;
  var x1 = v2.x,
      y1 = v2.y;


  return pointsDistance(x0, y0, x1, y1);
}

function horizontalLine(y) {
  return { a: 0, b: 1, c: -y };
}

function verticalLine(x) {
  return { a: 1, b: 0, c: -x };
}

function linePassingThroughTwoPoints(x1, y1, x2, y2) {
  // (x2 - x1)(y - y1) = (y2 - y1)(x - x1)
  // (y1 - y2)x + (x2 - x1)y + (y2x1 - x2y1) = 0

  if (x1 === x2 && y1 == y2) throw new Error("Geometry error");
  if (x1 === x2) return verticalLine(x);
  if (y1 === y2) return horizontalLine(y1);

  return {
    a: y1 - y2,
    b: x2 - x1,
    c: y2 * x1 - x2 * y1
  };
}

function distancePointFromLine(a, b, c, x, y) {
  //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
  return (0, _math.fAbs)(a * x + b * y + c) / Math.sqrt(a * a + b * b);
}

function closestPointFromLine(a, b, c, x, y) {
  //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
  var denom = a * a + b * b;
  return {
    x: (b * (b * x - a * y) - a * c) / denom,
    y: (a * -b * x + a * y - b * c) / denom
  };
}

function intersectionFromTwoLines(a, b, c, j, k, l) {
  var det = b * j - a * k;

  if (det === 0) return undefined; //no intersection

  var y = (a * l - c * j) / det;
  var x = (c * k - b * l) / det;
  return { x: x, y: y };
}

function intersectionFromTwoLineSegment(p1, p2, p3, p4) {
  //https://github.com/psalaets/line-intersect/blob/master/lib/check-intersection.js

  var x1 = p1.x,
      y1 = p1.y;
  var x2 = p2.x,
      y2 = p2.y;
  var x3 = p3.x,
      y3 = p3.y;
  var x4 = p4.x,
      y4 = p4.y;


  var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  var numA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  var numB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);

  if ((0, _math.fAbs)(denom) <= _constants.EPSILON) {
    if ((0, _math.fAbs)(numA) <= _constants.EPSILON && (0, _math.fAbs)(numB) <= _constants.EPSILON) {

      var comparator = function comparator(pa, pb) {
        return pa.x === pb.x ? pa.y - pb.y : pa.x - pb.x;
      };
      var line0 = [p1, p2].sort(comparator);
      var line1 = [p3.toJS(), p4.toJS()].sort(comparator);

      var _sort = [line0, line1].sort(function (lineA, lineB) {
        return comparator(lineA[0], lineB[0]);
      }),
          _sort2 = _slicedToArray(_sort, 2),
          lineSX = _sort2[0],
          lineDX = _sort2[1];

      if (lineSX[1].x === lineDX[0].x) {
        return { type: lineDX[0].y <= lineSX[1].y ? "colinear" : "none" };
      } else {
        return { type: lineDX[0].x <= lineSX[1].x ? "colinear" : "none" };
      }
    }
    return { type: "parallel" };
  }

  var uA = numA / denom;
  var uB = numB / denom;

  if (uA >= 0 - _constants.EPSILON && uA <= 1 + _constants.EPSILON && uB >= 0 - _constants.EPSILON && uB <= 1 + _constants.EPSILON) {
    var point = {
      x: x1 + uA * (x2 - x1),
      y: y1 + uA * (y2 - y1)
    };
    return { type: "intersecting", point: point };
  }

  return { type: "none" };
}

function distancePointFromLineSegment(x1, y1, x2, y2, xp, yp) {
  //http://stackoverflow.com/a/6853926/1398836

  var A = xp - x1;
  var B = yp - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0) //in case of 0 length line
    param = dot / len_sq;

  var xx = void 0,
      yy = void 0;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = xp - xx;
  var dy = yp - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 *
 * @param x1 {number} x for first vertex of the segment
 * @param y1 {number} y for first vertex of the segment
 * @param x2 {number} x for second vertex of the segment
 * @param y2 {number} y for second vertex of the segment
 * @param xp {number} x for point we want to verify
 * @param yp {number} y for point we want to verify
 * @param maxDistance {number} the epsilon value used for comparisons
 * @returns {boolean} true if the point lies on the line segment false otherwise
 */
function isPointOnLineSegment(x1, y1, x2, y2, xp, yp) {
  var maxDistance = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : _constants.EPSILON;

  return distancePointFromLineSegment(x1, y1, x2, y2, xp, yp) <= maxDistance;
}

function closestPointFromLineSegment(x1, y1, x2, y2, xp, yp) {
  if (x1 === x2) return { x: x1, y: yp };
  if (y1 === y2) return { x: xp, y: y1 };

  var m = (y2 - y1) / (x2 - x1);
  var q = y1 - m * x1;

  var mi = -1 / m;
  var qi = yp - mi * xp;

  var x = (qi - q) / (m - mi);
  var y = m * x + q;

  return { x: x, y: y };
}

function pointPositionOnLineSegment(x1, y1, x2, y2, xp, yp) {
  var length = pointsDistance(x1, y1, x2, y2);
  var distance = pointsDistance(x1, y1, xp, yp);

  var offset = distance / length;
  if (x1 > x2) offset = mapRange(offset, 0, 1, 1, 0);

  return offset;
}

function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function angleBetweenTwoPointsAndOrigin(x1, y1, x2, y2) {
  return -Math.atan2(y1 - y2, x2 - x1) * 180 / Math.PI;
}

function angleBetweenTwoPoints(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

function samePoints(_ref, _ref2) {
  var x1 = _ref.x,
      y1 = _ref.y;
  var x2 = _ref2.x,
      y2 = _ref2.y;

  return (0, _math.fAbs)(x1 - x2) <= _constants.EPSILON && (0, _math.fAbs)(y1 - y2) <= _constants.EPSILON;
}

/** @description Extend line based on coordinates and new line length
 *  @param {number} x1 Vertex 1 x
 *  @param {number} y1 Vertex 1 y
 *  @param {number} x2 Vertex 2 x
 *  @param {number} y2 Vertex 2 y
 *  @param {number} newDistance New line length
 *  @return {object}
 */
function extendLine(x1, y1, x2, y2, newDistance) {
  var precision = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 6;

  var rad = Math.atan2(y2 - y1, x2 - x1);

  return {
    x: (0, _math.toFixedFloat)(x1 + Math.cos(rad) * newDistance, precision),
    y: (0, _math.toFixedFloat)(y1 + Math.sin(rad) * newDistance, precision)
  };
}

function roundVertex(vertex) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;

  vertex.set('x', (0, _math.toFixedFloat)(vertex.get('x'), precision));
  vertex.set('y', (0, _math.toFixedFloat)(vertex.get('y'), precision));

  return vertex;
}