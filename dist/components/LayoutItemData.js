"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _button = _interopRequireDefault(require("carbon-react/lib/components/button"));

var _grid = require("carbon-react/lib/components/grid");

var _flatTable = require("carbon-react/lib/components/flat-table");

var _pill = _interopRequireDefault(require("carbon-react/lib/components/pill"));

var _splitButton = _interopRequireDefault(require("carbon-react/lib/components/split-button"));

var _definitionList = require("carbon-react/lib/components/definition-list");

var _heading = _interopRequireDefault(require("carbon-react/lib/components/heading"));

var _typography = _interopRequireWildcard(require("carbon-react/lib/components/typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var LayoutItemData = function LayoutItemData(_ref) {
  var apiDataType = _ref.apiDataType,
      getLayoutcol = _ref.getLayoutcol,
      componentLayout = _ref.componentLayout,
      apiResponse = _ref.apiResponse,
      handleOpen = _ref.handleOpen;

  var doBtnAction = function doBtnAction(hrefLink) {
    window.open(hrefLink, "_blank");
  };

  var constructTableData = function constructTableData(rowData, index) {
    var arrData = rowData.value && rowData.value.map(function (rowContent) {
      var rowDataVal = rowContent && replaceWithAPIRes(rowContent);
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_flatTable.FlatTableCell, null, rowDataVal, " "));
    });
    return /*#__PURE__*/_react.default.createElement(_flatTable.FlatTableRow, {
      onClick: function onClick() {
        return handleOpen(rowData.props, index, apiDataType);
      }
    }, arrData);
  };

  var constructTableObjData = function constructTableObjData(rowDataVal) {
    var arrData = rowDataVal.value.map(function (rowContent) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_flatTable.FlatTableCell, null, replaceWithAPIRes(rowContent), " "));
    });
    return /*#__PURE__*/_react.default.createElement(_flatTable.FlatTableRow, null, arrData);
  };

  var replaceWithAPIRes = function replaceWithAPIRes(data) {
    if (data && apiResponse.length > 0) {
      for (var _i = 0, _Object$entries = Object.entries(apiResponse[0].staticData); _i < _Object$entries.length; _i++) {
        var x = _Object$entries[_i];
        data = data.replace("#".concat(x[0]), x[1]);
      }
    }

    return data;
  };

  var getApiDataRow = function getApiDataRow() {
    var rData = [];

    if (apiDataType && apiResponse.length > 0) {
      var apiRowData = apiResponse[0];
      rData = apiRowData[apiDataType];
    }

    return rData ? rData : [];
  };

  var renderRowReport = function renderRowReport(componentData) {
    var type = componentData.type,
        props = componentData.props;
    var data = props.data,
        tableHeader = props.tableHeader,
        tableContent = props.tableContent,
        colValue = props.colValue,
        dataMethod = props.dataMethod;
    type = dataMethod === "api" ? "".concat(type, "Api") : type;
    var colRowVal = getLayoutcol(parseInt(colValue));
    var tableHeaderData = [],
        tableBody = [],
        argOne = "",
        argTwo = "",
        argThree = "",
        argFour = "",
        tableHeaderVal = [],
        rowValues = {},
        apiData = "";

    if (dataMethod === "api") {
      apiData = getApiDataRow();
      console.info("apiData", apiData);

      if (type == "TableApi" && apiData.tableHeader) {
        tableHeaderVal = apiData.tableHeader;
        tableBody = apiData.tableBody;
        if (!tableHeaderData) return null;
      } else {
        rowValues = apiData;
      }
    } else {
      if (type == "Table") {
        tableHeaderVal = tableHeader;
        tableBody = tableContent;
      }

      rowValues = data;
    }

    console.info(rowValues, "rowValues", "=-=", type);

    switch (type) {
      case "Heading":
      case "HeadingApi":
        {
          var header = typeof rowValues === "string" ? rowValues : rowValues.header;
          return /*#__PURE__*/_react.default.createElement(_grid.GridItem, {
            alignSelf: "stretch",
            justifySelf: "stretch",
            gridColumn: colRowVal
          }, /*#__PURE__*/_react.default.createElement(_heading.default, {
            title: header,
            divider: false,
            ml: "8px"
          }));
        }
        break;

      case "HeadingWithPill":
      case "HeadingWithPillApi":
        {
          var _rowValues = rowValues,
              _header = _rowValues.header,
              pills = _rowValues.pills;
          return /*#__PURE__*/_react.default.createElement(_grid.GridItem, {
            alignSelf: "stretch",
            justifySelf: "stretch",
            gridColumn: colRowVal
          }, /*#__PURE__*/_react.default.createElement(_heading.default, {
            title: _header,
            divider: false,
            ml: "8px",
            pills: pills ? /*#__PURE__*/_react.default.createElement(_pill.default, null, pills) : null
          }));
        }
        break;

      case "SubHeading":
      case "SubHeadingApi":
        return /*#__PURE__*/_react.default.createElement(_grid.GridItem, {
          alignSelf: "stretch",
          justifySelf: "stretch",
          gridColumn: colRowVal
        }, /*#__PURE__*/_react.default.createElement(_typography.default, {
          ml: "1px",
          variant: "h2"
        }, rowValues));
        break;

      case "Typography":
      case "TypographyApi":
        return /*#__PURE__*/_react.default.createElement(_grid.GridItem, {
          alignSelf: "stretch",
          justifySelf: "stretch",
          gridColumn: colRowVal
        }, /*#__PURE__*/_react.default.createElement(_typography.default, {
          variant: "h2"
        }, rowValues));
        break;

      case "Card":
      case "CardApi":
        {
          var _rowValues2 = rowValues,
              _header2 = _rowValues2.header,
              listOne = _rowValues2.listOne,
              listTwo = _rowValues2.listTwo,
              listThree = _rowValues2.listThree;
          return /*#__PURE__*/_react.default.createElement(_grid.GridItem, _extends({}, props.grid, {
            gridColumn: colRowVal
          }), /*#__PURE__*/_react.default.createElement(_definitionList.Dl, {
            ml: "10px",
            dtTextAlign: "left",
            asSingleColumn: true
          }, _header2 ? /*#__PURE__*/_react.default.createElement(_definitionList.Dt, {
            className: "wonder_text"
          }, replaceWithAPIRes(_header2)) : null, listOne ? /*#__PURE__*/_react.default.createElement(_definitionList.Dt, null, replaceWithAPIRes(listOne), " ") : null, listTwo ? /*#__PURE__*/_react.default.createElement(_definitionList.Dt, null, replaceWithAPIRes(listTwo)) : null, listThree ? /*#__PURE__*/_react.default.createElement(_definitionList.Dt, null, replaceWithAPIRes(listThree)) : null));
        }
        break;

      case "Button":
        return /*#__PURE__*/_react.default.createElement(_grid.GridItem, {
          alignSelf: "end",
          justifySelf: "end",
          gridColumn: colRowVal
        }, /*#__PURE__*/_react.default.createElement(_button.default, _extends({}, props, {
          onClick: function onClick() {
            return doBtnAction(rowValues);
          },
          className: "bottom_btn"
        }), rowValues));
        break;

      case "Table":
        return /*#__PURE__*/_react.default.createElement(_grid.GridItem, {
          alignSelf: "stretch",
          justifySelf: "stretch",
          gridColumn: colRowVal
        }, /*#__PURE__*/_react.default.createElement(_flatTable.FlatTable, {
          colorTheme: "transparent-white"
        }, /*#__PURE__*/_react.default.createElement(_flatTable.FlatTableHead, null, /*#__PURE__*/_react.default.createElement(_flatTable.FlatTableRow, null, tableHeaderVal.length > 0 && tableHeaderVal.map(function (rowHeader) {
          return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_flatTable.FlatTableHeader, null, rowHeader.label));
        }))), /*#__PURE__*/_react.default.createElement(_flatTable.FlatTableBody, null, tableBody.length > 0 && tableBody.map(function (row, index) {
          return constructTableData(row, index);
        }))));
        break;

      case "TableApi":
        return /*#__PURE__*/_react.default.createElement(_grid.GridItem, {
          alignSelf: "stretch",
          justifySelf: "stretch",
          gridColumn: colRowVal
        }, /*#__PURE__*/_react.default.createElement(_flatTable.FlatTable, {
          colorTheme: "transparent-white"
        }, /*#__PURE__*/_react.default.createElement(_flatTable.FlatTableHead, null, /*#__PURE__*/_react.default.createElement(_flatTable.FlatTableRow, null, tableHeaderVal.length > 0 && tableHeaderVal.map(function (rowHeader) {
          return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_flatTable.FlatTableHeader, null, rowHeader.label));
        }))), /*#__PURE__*/_react.default.createElement(_flatTable.FlatTableBody, null, tableBody.length > 0 && tableBody.map(function (row) {
          return constructTableObjData(row);
        }))));
        break;
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, componentLayout.type ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, " ", renderRowReport(componentLayout)) : "NO Value given");
};

var _default = LayoutItemData;
exports.default = _default;