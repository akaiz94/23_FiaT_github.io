/**!
 * ngrid.js
 *
 * @license
 * @author brian <dongpal.lee@gmail.com>
 * @version 2.0.0.9
 **/
console.log('## ngrid load !!')
var dateTime = ['regDate', 'modDate'];
var paramObj = {}
var timer;

var _params = $(location).attr('search');
_params = _params.replace('?', '');
if (_params == '' || _params == undefined) {
    paramObj = {};
} else {
    var str = decodeURIComponent(_params);
    var chunks = str.split('&'),
        obj = {};
    for (var c = 0; c < chunks.length; c++) {
        var split = chunks[c].split('=', 2);
        obj[split[0]] = split[1];
    }
    paramObj = obj;
}

function ngrid(option) {
    this.option = option;
}

ngrid.prototype.getOption = function () {
    return this.option;
}
ngrid.prototype.getData = function () {
    return this.data;
}
ngrid.prototype.setData = function (data) {
    return this.data = data;
}
ngrid.prototype.getSelect = function () {
    return this.select;
}
ngrid.prototype.setSelect = function (select) {
    return this.select = select;
}
ngrid.prototype.add = function (callback) {
    option = this.option;
    grid.add(option, function (response) {
        ngrid.prototype.setData(response.data);
        if (isFunction(callback)) callback(response);
    });
    return this;
}

ngrid.prototype.row = function (callback) {
    option = this.option;
    return new Promise(function (resolve, reject) {
        grid.row(option, function (response, obj) {
            if (response) {
                ngrid.prototype.setSelect(response);
                if (isFunction(callback)) callback(response, obj);
                resolve(response);
            }
            reject(new Error("Request is failed"));
        });
    })
}

var ajax = {
    get: function (URL, jsonData, callback) {
        $.fn.Ajax("GET", URL, jsonData, callback);
    },

    put: function (URL, jsonData, callback) {
        $.fn.Ajax("PUT", URL, jsonData, callback);
    },

    post: function (URL, jsonData, callback) {
        $.fn.Ajax("POST", URL, jsonData, callback);
    },

    delete: function (URL, jsonData, callback) {
        $.fn.Ajax("DELETE", URL, jsonData, callback);
    },
    file: function (URL, jsonData, callback) {
        $.fn.AjaxFile(URL, jsonData, callback);
    }
}

var CON_TYPE = 'application/json;charset=UTF-8';
const HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : ''
};

$.fn.extend({
    Ajax: function (type, URL, jsonData, callback) {
        if (type == "GET") {
            if (!$.isEmptyObject(jsonData)) {
                jsonData = jQuery.param(jsonData)
            }
        } else {
            jsonData = JSON.stringify(jsonData);
        }
        ;

        var $xhr = jQuery.ajax({
            type: type == undefined ? "GET" : type,
            url: URL,
            headers: HEADERS,
            contentType: CON_TYPE,
            data: jsonData,
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("AJAX", "true");
                // access_token이 없는 경우 로그인 페이지로 이동
                if (!localStorage.getItem('access_token')) {
                    location.href = '/login.html';
                    return false; // ajax 요청 중단
                }
            },
            success: function (response) {
                if (response.resultCode !== undefined && response.resultCode == "NG") {
                    if (isFunction(message)) {
                        message(response.resultCode, response.resultMsg);
                    } else {
                        alert(response.resultMsg)
                    }
                    return;
                }
                if (isFunction(callback)) callback(response);

            },
            error: function (response) {
                var msg = '처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.';
                if (isFunction(message)) {
                    if (!isEmpty(response.responseText)) {
                        if (response.responseText.indexOf('<!DOCTYPE') == 0) {
                            location.href = '/html/login.html';
                        } else {
                            var responsTextObj = $.parseJSON(response.responseText);
                            console.log('## responsTextObj', responsTextObj);
                            if (responsTextObj.message == 'AUTH_ERROR') {
                                clearTimeout(timer);
                                timer = setTimeout(function () {
                                    alertify.alert('프로그램 권한이 없습니다.')
                                }, 1000);
                            } else {
                                var resObj = JSON.parse(response.responseText);
                                message("NG", resObj.response.message)
                            }
                        }
                    } else {
                        message("NG", msg);
                    }
                } else {
                    alert(msg);
                }
                console.log('Ajax ERROR > : ', type, URL, jsonData);

            }
        });
        return $xhr;
    },

    AjaxFile: function (URL, jsonData, callback) {
        var $xhr = jQuery.ajax({
            url: URL,
            processData: false,
            contentType: false,
            data: jsonData,
            type: 'POST',
            headers: HEADERS,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("AJAX", "true");
            },
            success: function (response) {
                if (response.resultCode === undefined && typeof response == 'string') {
                    if (response.indexOf('<!DOCTYPE') == 0) {
                        location.href = '/html/login.html';
                    }
                } else if (response.resultCode == "NG") {
                    if (isFunction(message)) {
                        message(response.resultCode, response.resultMsg);
                    } else {
                        alert(response.resultMsg)
                    }
                    return;
                } else {
                    if (isFunction(callback)) callback(response);
                }
            },
            error: function () {
                if (isFunction(message)) {
                    if (!isEmpty(response.responseText)) {
                        if (response.responseText.indexOf('<!DOCTYPE') == 0) {
                            location.href = '/html/login.html';
                        } else {
                            var responsTextObj = $.parseJSON(response.responseText);
                            console.log('## responsTextObj', responsTextObj);
                            if (responsTextObj.message == 'AUTH_ERROR') {
                                clearTimeout(timer);
                                timer = setTimeout(function () {
                                    alertify.alert('프로그램 권한이 없습니다.')
                                }, 1000);
                            } else {
                                var resObj = JSON.parse(response.responseText);
                                message("NG", resObj.response.message)
                            }
                        }
                    } else {
                        message("NG", msg);
                    }
                } else {
                    alert(msg);
                }
                console.log('AjaxFile ERROR : ', URL, jsonData);
            }
        });
        return $xhr;
    },

    serializeArray: function () {
        var counter = 1;
        var _this = this;
        var rCRLF = /\r?\n/g;
        return this.map(function () {
            return this.elements ? jQuery.makeArray(this.elements) : this;
        }).map(function (i, elem) {
            var val = jQuery(this).val();
            if (elem.name != '') {
                if (val == null) {
                    return val == null
                } else if (this.type == "checkbox") {
                    var checkVal = $(_this).find('input:checkbox[name=' + this.name + ']').is(":checked") ? "Y" : "N";
                    return {
                        name: this.name,
                        value: checkVal

                    }
                } else if (this.type == "radio") { //&& this.checked == false
                    var length = $(_this).find('input:radio[name=' + this.name + ']').length;
                    if (counter == length) {
                        counter = 1;
                        return {
                            name: this.name,
                            value: $(_this).find('input:radio[name=' + this.name + ']:checked').val()
                        }
                    }
                    counter++;
                } else if (this.type == "textarea") {
                    var editorId = $(_this).find('[name=' + this.name + ']').attr('name');
                    if ($(_this).find('[name=' + this.name + ']').hasClass('ckeditor')) {
                    } else {
                        return {
                            name: this.name,
                            value: val.replace(rCRLF, "\r\n")
                        };
                    }
                } else if (this.type == "file") {
                    return {
                        name: this.name,
                        value: ''
                    }
                } else {
                    return jQuery.isArray(val) ?
                        jQuery.map(val, function (val, i) {
                            console.log('isArrayCheck true : val:', val)
                            return {
                                name: elem.name,
                                value: val.replace(rCRLF, "\r\n")
                            };
                        }) : {
                            name: elem.name,
                            value: val.replace(rCRLF, "\r\n")
                        };
                }
            }
        }).get();
    },

    set: function (_url, param, callback) {
        if (this.exists()) {
            if (this[0].tagName.toUpperCase() == "FORM") {
                var _frm = this;
                var _form = _frm.serializeArray();
                $.fn.Ajax("GET", _url, param, function (result) {
                    obj = result.data;
                    if (obj == null) {
                        return false;
                    }
                    _frm.clear();
                    $.each(_form, function () {

                        var _key = this.name;
                        var _val = obj[_key];
                        var find_form = "#" + _frm[0].id;
                        var tmp = $(_frm).find("[name$='" + _key + "']");
                        var slt = $(_frm).find("select[name='" + _key + "']");
                        var _textArea = $(_frm).find("textarea[name='" + _key + "']");
                        var checkedVal = _val;
                        var _type = $(_frm).find($(tmp)).prop("type")
                        if ('checkbox' === _type) {
                            if (checkedVal == 'Y') {
                                checkedVal = true;
                            } else {
                                checkedVal = false;
                            }

                            $(_frm).find('input:checkbox[name=' + _key + ']').prop("checked", checkedVal);

                        } else if ('radio' === _type) {
                            if (_val != undefined && _val != '') {
                                $(_frm).find('input:radio[name=' + _key + ']:input[value="' + checkedVal + '"]').prop("checked", true);
                            }
                        } else {
                            if (_val !== undefined) {
                                if ($(tmp).exists()) {
                                    if (_.includes(dateTime, _key)) {
                                        _val = getDateFormatStr(_val, 'yyyy-mm-dd hh:mm:ss');
                                    }
                                    $(_frm).find($(tmp)).val(_val);
                                }
                                if ($(_textArea).exists()) {
                                    $(_frm).find($(_textArea)).val(_val);

                                }
                            }
                        }

                        if ($(slt).exists()) {
                            $(slt).val(_val).prop('selected', true);
                        }
                    });
                    //$(_frm).setData(obj, function (data) {
                    //});
                    if (isFunction(callback)) callback(result);
                })
            } else {
                var comp = this;
                $.fn.Ajax("GET", _url, paramObj, function (result) {
                    obj = result;
                    $.each(obj, function (key, _d) {
                        $(comp).find('[data-id="' + key + '"]').html(_d);
                        var dataFormat = $(comp).find('[data-id="' + key + '"]').attr('data-format');
                        if (dataFormat != undefined) {
                            if (dataFormat == 'yyyy.mm.dd') {
                                var _onlyNum = _d.replace(/[^0-9]/g, "").substr(0, 8);
                                $(comp).find('[data-id="' + key + '"]').html(_onlyNum.substr(0, 4) + '.' + _onlyNum.substr(4, 2) + '.' + _onlyNum.substr(6, 2));
                            }
                        }
                    });
                    if (isFunction(callback)) callback(result);
                })
            }
        }

        return this;
    },

    setData: function (data, callback) {
        if (this.exists()) {
            if (this[0].tagName.toUpperCase() == "FORM") {
                var _frm = this;
                $.each(data, function (key, _d) {
                    if (!_.isEmpty(_d)) {
                        $(_frm).find('[name="' + key + '"]:not(.reset-false)').val(_d);
                    }
                });
                if (isFunction(callback)) callback(data);
            } else {
                var comp = this;
                $.each(data, function (key, _d) {
                    if ($.isPlainObject(_d) == false) {
                        if (_.includes(dateTime, key)) {
                            _d = getDateFormatStr(_d, 'yyyy-mm-dd hh:mm:ss');
                        }
                        if (!_.isEmpty(_d)) {
                            // _d = _d.replace(/(\n|\r\n)/g, '<br>');
                        }
                        $(comp).find('[data-id="' + key + '"]:not(.reset-false)').html(_d);
                    }
                });
                if (isFunction(callback)) callback(data);
            }
        }
        return this;
    },

    isValidate: function () {
        var result = true;
        var _jsonForm = this.serializeArray();
        $.each(_jsonForm, function () {
            var _name = this.name;
            var _item = "[name$='" + _name + "']";
            var _val = $(_item).val();
            var _placeholder = $(_item).attr('placeholder');
            var _isRequired = $(_item).hasAttr('required');
            var _isIdcheck = $(_item).hasAttr('idcheck');
            var _maxlength = $(_item).attr('maxlength');
            var _minlength = $(_item).attr('minlength');
            var _email = $(_item).hasAttr('email');
            var _telno = $(_item).hasAttr('telno');

            $(_item).removeClass('has-error');
            $(_item).closest('td').find('small').remove();

            _name = _placeholder == undefined ? this.name : _placeholder;
            // require 체크
            if (_isRequired && _.isEmpty(_val)) {
                result = makeErrorMsg(_name + '은 필수항목입니다.');
                return result
            }

            if (_isIdcheck) {
                if (!/^[a-zA-Z0-9_-]{5,20}$/.test(_val)) {
                    result = makeErrorMsg(_name + '은 5~20자의 영문 소문자, 숫자와 특수기호(_, -)만 사용 가능합니다.');
                    return result
                }
            }

            // maxcheck
            if (_maxlength > 0 && _val.length > _maxlength) {
                result = makeErrorMsg(_name + '은 ' + _maxlength + '자 이하여야 합니다.');
                return result
            }

            // mincheck
            if (_minlength > 0 && _val.length < _minlength) {
                result = makeErrorMsg(_name + '은 ' + _minlength + '자 이상이여야 합니다.');
                return result
            }
        });
        return result;
    },

    action: function (type, URL, callback) {
        var formId = this;
        var formData = $(formId).json();
        var isValidate = $(formId).isValidate();

        if (isValidate) {
            jQuery.ajax({
                type: type == undefined ? API_POST : type,
                url: URL,
                headers: HEADERS,
                contentType: CON_TYPE,
                data: JSON.stringify(formData),
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("AJAX", "true");
                },
                success: function (response) {
                    if (response.resultCode !== undefined && response.resultCode == "NG") {
                        if (isFunction(message)) {
                            message(response.resultCode, response.resultMsg);
                        } else {
                            alert(response.resultMsg)
                        }
                        return;
                    }

                    setTimeout(function () {
                        if (isFunction(callback)) callback(response);
                    }, 1000);

                },
                error: function (response) {
                    var msg = '처리중 오류가 발생하였습니다. 관리자에게 문의 바랍니다.';

                    if (isFunction(message)) {
                        if (!isEmpty(response.responseText)) {
                            if (response.responseText.indexOf('<!DOCTYPE') == 0) {
                                location.href = '/html/login.html';
                            } else {
                                var responsTextObj = $.parseJSON(response.responseText);
                                console.log('## responsTextObj', responsTextObj);
                                if (responsTextObj.message == 'AUTH_ERROR') {
                                    clearTimeout(timer);
                                    timer = setTimeout(function () {
                                        alertify.alert('프로그램 권한이 없습니다.')
                                    }, 1000);
                                } else {
                                    var resObj = JSON.parse(response.responseText);
                                    message("NG", resObj.response.message)
                                }
                            }
                        } else {
                            message("NG", msg);
                        }
                    } else {
                        alert(msg);
                    }
                }
            });
        }

    },

    csvToJson: function (csvText) {
        var allTextLines = csvText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(/\t|,/);
        var locations = [];

        for (var i = 1; i < allTextLines.length; i++) {
            var data = allTextLines[i].split(/\t|,/);
            var row = {};
            if (data.length == headers.length) {
                for (var j = 0; j < headers.length; j++) {
                    row[headers[j]] = data[j] || '';
                }
                locations.push(row);
            }
        }
        return locations;
    },

    json: function () {
        var o = {};
        if (this.exists()) {
            if (this[0].tagName.toUpperCase() == "FORM") {
                var a = this.serializeArray();
                $.each(a, function () {
                    if (this.name !== '' && this.name !== undefined) {
                        if (o[this.name] !== undefined) {
                            if (!o[this.name].push) {
                                o[this.name] = [o[this.name]];
                            }
                            o[this.name].push(this.value || '');
                        } else {
                            o[this.name] = this.value || '';
                        }
                    }

                });
            } else {
                var arr = $(this).find('input')
                if (arr) {
                    jQuery.each(arr, function () {
                        o[this.name] = this.value;
                    });
                }
            }
        }


        return o;
    },

    clear: function () {
        // 파일 썸네일 클리어
        $('.add_file').find('.img').css({'background': ''});
        $('.fileInfo').empty();
        $('.label-file-drag').html('-');
        $('.input-file-drag').val('');

        //validate clear
        $('.has-error').removeClass('has-error');
        $('td').find('small').remove();

        //$('.btn-pop-preview').hide();
        $('.bootstrap-filestyle ').find('.form-control').val('');
        // multy select
        $('.select2-multiple').val([]).trigger('change');
        // img thumbnail
        $(".thumbnail-preview").html('');
        $('.file-preview').html('');
        $('.data-preview').html('');
        var _frm = this;
        var _jsonForm = this.serializeArray();
        $.each(_jsonForm, function () {
            var _tmp = $(_frm).find("[name$='" + this.name + "']");
            var _type = $(_frm).find(_tmp).attr('type');
            var _textArea = $(_frm).find("textarea[name='" + this.name + "']");

            if (_type !== 'radio') {
                if (_type == 'checkbox') {
                    $(_frm).find(_tmp).prop('checked', false);
                } else {
                    if ($(_frm).find(_tmp).hasAttr('unclear')) {
                    } else {
                        $(_frm).find(_tmp).val('');
                        if ($(_textArea).exists()) {
                            $(_frm).find(_textArea).val('');
                        }
                    }

                }
            }
        });
    },

    submit: function (method, url, callback) {
        var _form = this;
        _form.action(method, url, function (result) {
            if (isFunction(callback)) callback(result);
        });
    },

    hJson: function (callback) {
        var options = {
            /* action='downoad' options */
            filename: 'table.csv',
            /* action='output' options */
            appendTo: 'body',
            /* general options */
            separator: ',',
            newline: '\n',
            quoteFields: true,
            excludeColumns: '',
            excludeRows: ''
        };

        var output = [];
        var _table = this;
        var rows = _table.find('thead').find('tr').not(options.excludeRows);
        var numCols = rows.first().find("td,th").filter(":visible").not(options.excludeColumns).length;
        var rowNum = 0;
        var rowSpan = 0;
        rows.each(function () {

            $(this).find("td,th").filter(":visible").not(options.excludeColumns)
                .each(function (i, col) {
                    col = $(col);

                    var _id = $(col).data('id');
                    var _name = $(col).data('id');
                    var _obj = {'id': _id, 'name': col.text()}
                    if (!isEmpty(_id) && !isEmpty(_name)) {
                        output.push(_obj);
                    }
                });
        });
        return output;
    },

    download: function (_url, paramObj, fileName) {
        var _table = this;
        var _csvStr = '';
        var _hArray = $(_table).hJson();
        var _headerRow = headerConvert(_table);
        var _dataRow = '';
        $.fn.Ajax("GET", _url, paramObj, function (result) {
            _data = result.data;
            $.each(_data, function (key, _obj) {
                $.each(_hArray, function (_hkey, _hobj) {
                    var _hid = _hobj.id;

                    var _col = _obj[_hid];
                    if ("GRID_CUSTORM_SEQ" == _hid) {
                        _col = key + 1;
                    }

                    _col = (_col == undefined) ? '""' : _col;
                    _dataRow = _dataRow + ((_col) + (_hArray.length - 1 != _hkey ? ',' : ''));
                });
                _dataRow += '\r\n';
            })
            _csvStr = _headerRow + _dataRow;

            if (msieversion()) {
                var IEwindow = window.open();
                IEwindow.document.write('sep=,\r\n' + _csvStr);
                IEwindow.document.close();
                IEwindow.document.execCommand('SaveAs', true, fileName + ".csv");
                IEwindow.close();
            } else {
                var uri = 'data:application/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(_csvStr);
                var link = document.createElement("a");
                link.href = uri;
                link.style = "visibility:hidden";
                link.download = fileName + ".csv";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        })
    },

    /*    addPage: function (page_param) {
        var _page_param = page_param
        totalCount = _page_param.totalCount
        currentPage = _page_param.currentPage
        pageSize = _page_param.pageSize
        var _this = this;
        var page_html = '<ul>\n' +
            ' <li class="pagenumber-first"><button type="button">first_page</button></li>\n' +
            ' <li class="pagenumber-chevron-left"><button type="button">chevron_left</button></li>\n';

        for (var i = 1; i <= Math.ceil(totalCount / pageSize); i++) {
            if (i === currentPage) {
                page_html += ' <li class="on"><a href="#" target="_self">' + i + '</a></li>\n';
            } else {
                page_html += ' <li><a href="javascript:fnSetCurrentPage(' + i + ')" target="_self">' + i + '</a></li>\n';
            }
        }

        page_html += ' <li class="pagenumber-chevron-right"><button type="button">chevron_right</button></li>\n' +
            ' <li class="pagenumber-load"><button type="button">load_page</button></li>\n' +
            ' </ul>';
        $(_this).html(page_html);
    },*/
    addPage: function (page_param) {
        var _page_param = page_param;
        var totalCount = _page_param.totalCount;
        var currentPage = _page_param.currentPage;
        var pageSize = _page_param.pageSize;
        var _this = this;
        var page_html = '<ul class="pagination-list">\n';

        var totalPages = Math.ceil(totalCount / pageSize);
        var startPage = 1;
        var endPage = Math.min(startPage + 9, totalPages);

        if (currentPage > 5) {
            startPage = currentPage - 4;
            endPage = currentPage + 5;

            if (endPage > totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            }
        }
        if(startPage<=0)
            startPage = 1

        if (startPage > 1) {
            page_html += ' <li class="pagination-item start"><a class="page-link" href="javascript:fnSetCurrentPage(1)" target="_self">1</a></li>\n';
            page_html += ' <li class="pagination-item disabled"><a class="page-link" href="#" target="_self">...</a></li>\n';
        }

        for (var i = startPage; i <= endPage; i++) {
            if (i === currentPage) {
                page_html += ' <li class="pagination-item active"><a class="page-link" href="#" target="_self">' + i + '</a></li>\n';
            } else {
                page_html += ' <li class="pagination-item"><a class="page-link" href="javascript:fnSetCurrentPage(' + i + ')" target="_self">' + i + '</a></li>\n';
            }
        }

        if (endPage < totalPages) {
            page_html += ' <li class="page-item disabled"><a class="page-link" href="#" target="_self">...</a></li>\n';
            page_html += ' <li class="pagination-item end"><a class="page-link" href="javascript:fnSetCurrentPage(' + totalPages + ')" target="_self">' + totalPages + '</a></li>\n';
        }

        page_html += '</ul>';
        $(_this).html(page_html);
    }

});

function headerConvert(table) {
    var output = "";
    var options = {
        excludeRows: '',
        excludeColumns: ''
    }
    var rows = table.find('thead').find('tr').not(options.excludeRows);
    var numCols = rows.first().find("td,th").filter(":visible").not('').length;

    var rowNum = 0;
    var rowSpan = 0;
    rows.each(function () {

        $(this).find("td,th").filter(":visible").not(options.excludeColumns)
            .each(function (i, col) {
                col = $(col);

                var colspan = $(col).attr('colSpan');
                if (i == 0 && rowNum == 0) {
                    rowSpan = $(col).attr('rowSpan');
                    rowSpan--;
                }
                if (!isEmpty(col.text())) {
                    output += quote(col.text());
                    for (var c = 1; c < colspan; c++) {
                        output += ',' + '""';
                        numCols++;
                    }
                    if (i != numCols - 1) {
                        output += ',';
                    }
                }
            });

        output += '\n';
        if (rowSpan > 0) {
            output += ',';
            rowSpan--;
        }
        rowNum++;
    });

    return output;
}

var grid = {

    add: function (option, callback) {
        if (isFunction(showLoading)) showLoading($(option.table));
        // 기본페이징 처리
        if (_.isEmpty(option.param.page)) {
            option.param.page = 1; //현재페이지
        }
        if (_.isEmpty(option.param.from)) {
            option.param.from = 0; // 시작
        }
        if (_.isEmpty(option.param.to)) {
            option.param.to = 100000; // 목록개수
        }

        var style = option.style;
        var _this = option.table;
        var _bLengthChange = true;
        /* Showing 셀렉트 entries 영역*/
        var _paging = true;
        var _pageLength = 10;
        var _bInfo = false;
        /* 하단 Showing 1 to 10 of 16 entries 영역*/

        var _dom = 'Blfrtip';

        if (option.bLengthChange !== undefined) {
            _bLengthChange = option.bLengthChange;
        }
        if (option.paging !== undefined) {
            _paging = option.paging;
        }
        if (option.pageLength !== undefined) {
            _pageLength = option.pageLength;
        }
        if (option.bInfo !== undefined) {
            _bInfo = option.bInfo;
        }
        if (option.dom !== undefined) {
            _dom = option.dom;
        }

        var tbody = '';
        _this.find('tbody').remove();
        $(_this).append('<tbody></tbody>');
        if (option.parameters !== undefined) {
            if ($.isEmptyObject(option.param)) {
                option.param = option.parameters;
            } else {
                option.param = $.extend({}, option.param, option.parameters);
            }
        }

        $.fn.Ajax("GET", option.url, option.param, function (result) {
            data = result.data;

            if (isEmpty(result.data)) { //gateway 호출
                data = result.list;
            }
            if (!isEmpty(data)) {
                tbody = grid.body(data, option);
            }
        }).done(function (data) {
            $(_this).find('tbody').append(tbody);
            if (isFunction(callback)) callback(data);

            switch (style) {
                case 'data-table':
                    $(_this).dataTable({
                        destroy: true,
                        // bLengthChange: _bLengthChange,
                        // bLengthChange: false,
                        searching: false,
                        paging: _paging,
                        info: false,
                        "order": [],
                        dom: _dom,
                        "language": {
                            "lengthMenu": "_MENU_",
                            "emptyTable": "등록된 정보가 없습니다.",
                            paginate: {
                                previous: '‹',
                                next: '›'
                            }
                        },
                        buttons: [
                            // {
                            //     extend: 'copy',
                            //     text: '복사',
                            //     exportOptions: {
                            //         columns: ':visible'
                            //     }
                            // },
                            {
                                extend: 'excel',
                                text: '엑셀다운',
                                // title: '조회목록',
                                exportOptions: {
                                    columns: ':visible'
                                },
                                customizeData: function (data) { //엑셀 다운시 숫자값 모두 텍스트로
                                    for (var i = 0; i < data.body.length; i++) {
                                        for (var j = 0; j < data.body[i].length; j++) {
                                            data.body[i][j] = '\u200C' + data.body[i][j];
                                        }
                                    }
                                }
                            }
                        ]
                    })
                    break;
                case 'page-check-table':
                    // check All
                    $(_this).find('thead').find('input[type=checkbox]').eq(0).on('click', function () {
                        var th_checked = this.checked;
                        $(this).closest('table').find('tbody > tr').each(function () {
                            var row = this;
                            if (th_checked) $(row).find('input[type=checkbox]:not(:disabled)').eq(0).prop('checked', true);
                            else $(row).find('input[type=checkbox]').eq(0).prop('checked', false);
                        });
                    });
                    grid.page(option, data, callback);
                    break;
                case 'check-table':
                    $(_this).dataTable({
                        destroy: true,
                        // bLengthChange: _bLengthChange,
                        // bLengthChange: false,
                        searching: false,
                        paging: _paging,
                        "pageLength": _pageLength,
                        ordering: true,
                        responsive: true,
                        bInfo: _bInfo,
                        "order": [
                            [1, "asc"]
                        ],
                        "columnDefs": [{
                            "targets": [0],
                            "orderable": false
                        }],
                        dom: _dom,
                        "language": {
                            "lengthMenu": "_MENU_",
                            "emptyTable": "등록된 정보가 없습니다.",
                            paginate: {
                                previous: '‹',
                                next: '›'
                            }
                        },
                        buttons: [
                            // {
                            //     extend: 'copy',
                            //     text: '복사',
                            //     exportOptions: {
                            //         columns: ':visible'
                            //     }
                            // },
                            {
                                extend: 'excel',
                                text: '엑셀다운',
                                // title: '조회목록',
                                exportOptions: {
                                    columns: ':visible'
                                },
                                customizeData: function (data) { //엑셀 다운시 숫자값 모두 텍스트로
                                    for (var i = 0; i < data.body.length; i++) {
                                        for (var j = 0; j < data.body[i].length; j++) {
                                            data.body[i][j] = '\u200C' + data.body[i][j];
                                        }
                                    }
                                }
                            }
                        ]
                    })
                    // check All
                    $(_this).find('thead').find('input[type=checkbox]').eq(0).on('click', function () {
                        var th_checked = this.checked;
                        $(this).closest('table').find('tbody > tr').each(function () {
                            var row = this;
                            if (th_checked) $(row).find('input[type=checkbox]:not(:disabled)').eq(0).prop('checked', true);
                            else $(row).find('input[type=checkbox]').eq(0).prop('checked', false);
                        });
                    });
                    break;
                case 'page-table':
                    console.log('## page-table', data)
                    grid.page(option, data, callback);
                    break;
                case 'check-no-paging':
                    // check All
                    $(_this).find('thead').find('input[type=checkbox]').eq(0).on('click', function () {
                        var th_checked = this.checked;
                        $(this).closest('table').find('tbody > tr').each(function () {
                            var row = this;
                            if (th_checked) $(row).find('input[type=checkbox]:not(:disabled)').eq(0).prop('checked', true);
                            else $(row).find('input[type=checkbox]').eq(0).prop('checked', false);
                        });
                    });
                    break;
                default: //'table'

                    break;
            }
            $(_this).removeAttr("style");
            // TotCnt
            var _gridTotalCnt = 0;
            if (!isEmpty(data.list)) {
                _gridTotalCnt = data.list.length;
            } else if (!isEmpty(data.data)) {
                _gridTotalCnt = data.data.length;
            }
            $('#' + _this.attr("id")).closest('.panel').find('.grid_list_cnt').html(_gridTotalCnt);
            //hide loading
            if (isFunction(hideLoading)) hideLoading($(option.table));
        });
    },

    page: function (option, data, callback) {
        var _this = option.table;
        var page_row = _this.attr("id") + "_row";
        $('#' + page_row).remove();
        var _pageNumberUnit = 10;
        var _pageUnit = option.param.to;
        if (_.isEmpty(_pageUnit)) {
            _pageUnit = 10;
        }
        console.log('data', data);
        var _totCnt = data.totalCnt;
        var _currentPage = option.param.page;
        if (_currentPage == undefined) {
            _currentPage = 1;
        }
        var _totPage = _totCnt % _pageUnit == 0 ? Math.floor(_totCnt / _pageUnit) : Math.floor(_totCnt / _pageUnit) + 1;
        var _startPage = _currentPage % _pageNumberUnit == 0 ? Math.floor((Number(_currentPage) - 1) / _pageNumberUnit) * _pageNumberUnit + 1 : Math.floor(
            _currentPage / _pageNumberUnit) * _pageNumberUnit + 1;
        var _endPage = Number(_startPage) + Number(_pageNumberUnit) - 1;

        if (_endPage > _totPage) {
            _endPage = _totPage;
        }
        var _prevPage = _currentPage > 1 ? Number(_currentPage) - 1 : _currentPage;
        var _nextPage = _currentPage < _totPage ? Number(_currentPage) + 1 : _currentPage;

        var paginId = _this.attr("id") + "_paginId";

        var _endNo = Number(_currentPage) * Number(_pageUnit);
        var _startNo = _endNo - Number(_pageUnit) + 1;

        if (Number(_endNo) > Number(_totCnt)) _endNo = _totCnt;

        var _pageHtml = '';
        _pageHtml += '<div class="row" id="' + page_row + '">';

        _pageHtml += '<div class="col-sm-12 col-md-5">';
        _pageHtml += '</div>';

        _pageHtml += '	<div class="col-sm-12 col-md-7">';
        _pageHtml += '		<div class="dataTables_paginate paging_simple_numbers" id="' + paginId + '" style="text-align: right;">';
        _pageHtml += '			<ul class="pagination">';

        // previous
        _pageHtml += '				<li class="paginate_button page-item previous disabled" data-dt-idx="' + _prevPage + '" id="selection-datatable_previous">';
        _pageHtml += '					<a href="javascript:" aria-controls="selection-datatable" tabindex="0" class="page-link">Previous</a>';
        _pageHtml += '				</li>';

        // 중간페이지
        for (var i = _startPage; i <= _endPage; i++) {
            if (i == _currentPage) {
                _pageHtml += '				<li class="paginate_button page-item active" data-dt-idx="' + i
                    + '"><a href="javascript:" aria-controls="selection-datatable"  tabindex="0" class="page-link">' + i + '</a></li>';
            } else {
                _pageHtml += '				<li class="paginate_button page-item" data-dt-idx="' + i
                    + '"><a href="javascript:" aria-controls="selection-datatable"  tabindex="0" class="page-link">' + i + '</a></li>';
            }
        }
        // next
        _pageHtml += '				<li class="paginate_button page-item next" data-dt-idx="' + _nextPage + '" id="selection-datatable_next">';
        _pageHtml += '					<a href="javascript:" aria-controls="selection-datatable" tabindex="0" class="page-link">Next</a>';
        _pageHtml += '				</li>';
        _pageHtml += '			</ul>';
        _pageHtml += '		</div>';
        _pageHtml += '	</div>';
        _pageHtml += '</div>';

        _this.after(_pageHtml);
        $('#' + paginId + ' > ul > li').unbind("click");
        $('#' + paginId + ' > ul > li').on("click", function () {
            //var _page = $(this).text();
            var _pageIdx = $(this).data("dt-idx");
            var _from = (_pageIdx == 1 ? 0 : ((_pageIdx - 1) * _pageUnit));

            option.param.page = _pageIdx;
            option.param.from = _from;
            option.param.to = _pageUnit;
            grid.add(option, callback);
        });
    },

    row: function (option, callback) {
        option.table.unbind("click");

        option.table.on('click', 'tbody tr:not([data-exclude]) td:not([data-exclude]) ', function () {
            if (option.style == 'check-table' || option.style == 'check-no-paging') {
                var checked = $(this).find('input[type="checkbox"]').eq(0).is(":checked") ? true : false;
                if (checked) {
                    return;
                }
            }
            $(option.table).find('tr').removeClass('info');
            $(this).closest("tr").addClass('info');
            var _rows = grid.select(this);
            if (isFunction(callback)) callback(_rows, $(this));
        });

        option.table.unbind("mouseover");
        option.table.on('mouseover', 'tbody tr:not([data-exclude]) ', function () {
            $(this).css('cursor', 'pointer');
        });
    },

    hJson: function (option) {
        var thJson = {};
        _.each(grid.hArray(option), function (th) {
            thJson[th] = '';
        })
        return thJson;
    },

    hArray: function (option) {
        var thArray = [];
        var _table = option.table;
        var _row = _table.find("thead tr");
        var _subRow = [];
        var _start = 0;
        var $rows = _row.each(function (_idx) {

            $cells = $(this).find("th");

            _row.eq(_idx + 1).find('th').each(function (ci) {
                _subRow.push($(this).data('id'))
            })

            $cells.each(function (cellIndex) {
                if ($(this).data('hidden') != undefined) {
                    $(this).attr('style', 'display:none')
                }
                var th = $(this).data('id');
                var _colspan = 0;
                if ($(this).attr('colspan')) {
                    _colspan = Number($(this).attr('colspan'));
                }
                if (_colspan > 1) {
                    var spanData = _.slice(_subRow, _start, (_start + _colspan))
                    _.each(spanData, function (val) {
                        thArray.push(val)
                    })
                    _start = _start + _colspan
                } else {
                    if (th != undefined) {
                        thArray.push(th);
                    }
                }
            });
        });
        return thArray;
    },

    download: function (option) {
        var rows = [],
            header = [];
        header = grid.hArray(option);
        console.log('downloadCsv header:', header);
        $(option.table).find("tbody tr").each(function () {
            var row = {};
            $(this).find("td").each(function (i) {
                var key = header[i],
                    value = $(this).html();
                if (key != '' && key != 'checkable') {
                    row[key] = value;
                } else {
                    row[key] = '';
                }
            });
            rows.push(row);
        });
        console.log('downloadCsv rows:', rows);
        JSONToCSVConvertor(rows, 'Table_CSV_Download', true)
    },

    body: function (data, option) {
        var tbody = '';
        var thJson = grid.hJson(option);
        var _table = option.table;
        var seqNumber = 1;
        $.each(data, function (i, el) {
            if (option.style == 'check-table') {
                tbody = tbody + '<tr><td class="center button"><input type="checkbox" class="checkMe" id="' + option.table.attr("id") + i + '" value=""><label for="'
                    + option.table.attr("id") + i + '"></label></td>';
            } else {
                tbody = tbody + '<tr>';
            }

            $.each(thJson, function (th, value) {
                var eachFlag = true;
                // for (key in el) {
                var col = $(_table).find('[data-id="' + th + '"]');
                if (th in el) {

                    var style = '';
                    if (col.data('hidden') != undefined) {
                        style = 'style=\'display:none\'';
                    } else if (col.data('align') != undefined) {
                        style = 'style=\'text-align:' + col.data('align') + '\'';
                    }
                    var exclude = '';
                    if (col.data('exclude') != undefined) {
                        exclude = 'data-exclude'
                    }
                    var tdData = grid.cdata(th, el[th], option, el);
                    if (col.data('format') != undefined) {
                        var formatType = col.data('format');
                        if (formatType == ',') {
                            tdData = fnCommaNumberFormat(tdData);
                        } else if (formatType == 'yyyy-mm-dd') {
                            var _onlyNum = tdData.replace(/[^0-9]/g, "").substr(0, 8);
                            if (_onlyNum.length == 8) {
                                tdData = _onlyNum.substr(0, 4) + '-' + _onlyNum.substr(4, 2) + '-' + _onlyNum.substr(6, 2);
                            }
                        } else if (formatType == 'yyyy-mm-dd hh:mm:ss') {
                            var _onlyNum = tdData.replace(/[^0-9]/g, "").substr(0, 14);
                            if (_onlyNum.length == 14) {
                                tdData = _onlyNum.substr(0, 4) + '-' + _onlyNum.substr(4, 2) + '-' + _onlyNum.substr(6, 2) +
                                    ' ' + _onlyNum.substr(8, 2) + ':' + _onlyNum.substr(10, 2) + ':' + _onlyNum.substr(12, 2);
                            }
                        } else if (formatType == 'hh:mm:ss') {
                            var _onlyNum = tdData.replace(/[^0-9]/g, "").substr(0, 6);
                            if (_onlyNum.length == 6) {
                                tdData = _onlyNum.substr(0, 2) + ':' + _onlyNum.substr(2, 2) + ':' + _onlyNum.substr(4, 2);
                            }
                        } else if (formatType == 'biz-no') { //사업자 번호
                            var _onlyNum = tdData.replace(/[^0-9]/g, "").substr(0, 10);
                            if (_onlyNum.length == 10) {
                                tdData = _onlyNum.substr(0, 3) + '-' + _onlyNum.substr(3, 2) + '-' + _onlyNum.substr(5, 5);
                            }
                        }
                    }
                    tbody = tbody + "<td " + style + "data-id=" + th + ' ' + exclude + ">" + tdData + "</td>";
                } else {

                    if (eachFlag && th.indexOf("GRID_CUSTORM_") != -1) {
                        var gridData = "";
                        //순번
                        if (th.indexOf("GRID_CUSTORM_SEQ") != -1) {
                            if (isEmpty(option.param.page)) {
                                gridData = seqNumber;
                            } else {
                                gridData = (Number(option.param.page) - 1) * Number(option.param.to) + seqNumber;
                            }
                            seqNumber++;
                        }

                        var exclude = '';
                        if (col.data('exclude') != undefined) {
                            exclude = 'data-exclude'
                        }

                        tbody = tbody + "<td " + exclude + ">" + grid.cdata(th, gridData, option, el) + "</td>";
                        eachFlag = false;
                    }
                }
                // }
            });
            tbody = tbody + '</tr>';
        });
        return tbody;
    },

    select: function (obj) {
        var $row = $(obj).closest("tr");
        var _json = {};
        $tds = $row.find("td:not([data-exclude]) ");
        $.each($tds, function () {
            _id = $(this).data('id');

            if ($(this).find('input').length) {
                _col = $(this).find('input').is(':checked');
            } else {
                _col = $(this).text();
            }
            if (_id && _id != 'regDate' && _id != 'updDate') {
                _json[$(this).data('id')] = _col;
            }
        });
        return _json;
    },

    cdata: function (key, data, option, el) {
        var retVal = data;
        retVal = convChar(retVal);
        if ($.isFunction(option.callback)) {
            retVal = option.callback(key, retVal, el);
        }
        if (!_.isEmpty(data) && data.length > 300) {
            retVal = data.substring(0, 300) + '...';
        }
        if (isEmpty(retVal)) {
            retVal = '';
        }

        if (_.includes(dateTime, key)) {
            retVal = getDateFormatStr(data, 'yyyy-mm-dd hh:mm:ss')
        }
        return retVal;
    }
}

function convChar(str) {
    if ($.type(str) === "string") {
        str = str.replace(/&/g, "&amp;");
        str = str.replace(/>/g, "&gt;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/"/g, "&quot;");
        str = str.replace(/'/g, "&#039;");

        str = str.replace(/[\"\'][\s]*javascript:(.*)[\"\']/g, "\"\"");
        str = str.replace(/eval\((.*)\)/g, "");
    }
    return str;
};


var template = {
    set: function (templatName, targetObj, data, callback) {

        var template = Handlebars.compile(templatName.html());
        targetObj.html(template(data));
        if (isFunction(callback)) callback();

    },

    append: function (templatName, targetObj, data, callback) {

        var template = Handlebars.compile(templatName.html());
        targetObj.append(template(data));
        if (isFunction(callback)) callback();

    },

    prepend: function (templatName, targetObj, data, callback) {

        var template = Handlebars.compile(templatName.html());
        targetObj.prepend(template(data));
        if (isFunction(callback)) callback();

    },

    after: function (templatName, targetObj, data, callback) {

        var template = Handlebars.compile(templatName.html());
        targetObj.after(template(data));
        if (isFunction(callback)) callback();

    },

    prependHtml: function (html, targetObj, data, callback) {

        var template = Handlebars.compile(html);
        targetObj.prepend(template(data));
        if (isFunction(callback)) callback();

    },
}

// 체크된 테이블 데이터
$.fn.checkData = function (matchColArr) {
    var dataList = new Array();
    $(this).find('tbody > tr').each(function (i, tr) {
        if ($(tr).find("input[type='checkbox']").is(":checked")) {
            var dataObj = new Object();
            $(tr).find('td').each(function (j, td) {
                var colNm = $(td).data('id');
                if (colNm !== undefined && matchColArr.indexOf(colNm) > -1) {
                    if ($(td).find('input').length > 0) {
                        dataObj[colNm] = $(td).find('input').val();
                    } else if ($(td).find('select').length > 0) {
                        dataObj[colNm] = $(td).find('select').val();
                    } else {
                        dataObj[colNm] = $(td).html();
                    }
                }
            })
            dataList.push(dataObj);
        }
    })
    return dataList;
};

// 같은 값이 있는 열을 병합
$.fn.rowspan = function (colIdx, isStats) {
    return this.each(function () {
        var that;
        $('tr', this).each(function (row) {
            $('td:eq(' + colIdx + ')', this).filter(':visible').each(function (col) {

                if ($(this).html() == $(that).html() &&
                    (!isStats ||
                        isStats && $(this).prev().html() == $(that).prev().html()
                    )
                ) {
                    rowspan = $(that).attr("rowspan") || 1;
                    rowspan = Number(rowspan) + 1;

                    $(that).attr("rowspan", rowspan);

                    // do your action for the colspan cell here
                    $(this).hide();

                    //$(this).remove();
                    // do your action for the old cell here

                } else {
                    that = this;
                }

                // set the that if not already set
                that = (that == null) ? this : that;
            });
        });
    });
};

//같은 값이 있는 행을 병합함
$.fn.colspan = function (rowIdx) {
    return this.each(function () {

        var that;
        $('tr', this).filter(":eq(" + rowIdx + ")").each(function (row) {
            $(this).find('th').filter(':visible').each(function (col) {
                if ($(this).html() == $(that).html()) {
                    colspan = $(that).attr("colSpan") || 1;
                    colspan = Number(colspan) + 1;

                    $(that).attr("colSpan", colspan);
                    $(this).hide(); // .remove();
                } else {
                    that = this;
                }

                // set the that if not already set
                that = (that == null) ? this : that;

            });
        });
    });
}

function JSONToCSVConvertor(JSONData, fileName, ShowLabel) {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    if (ShowLabel) {
        var row = "";
        for (var index in arrData[0]) {
            if (index == 'checkable' || index == 'seq') {
                continue;
            }
            row += index + ',';
        }
        row = row.slice(0, -1);
        CSV += row + '\r\n';
    }

    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        for (var index in arrData[i]) {
            var arrValue = arrData[i][index] == null ? "" : arrData[i][index];
            row += arrValue + ',';
        }
        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
    }
    if (CSV == '') {
        console.log("JSONToCSVConvertor Invalid data");
        return;
    }
    //var fileName = "Template";
    if (msieversion()) {
        var IEwindow = window.open();
        IEwindow.document.write('sep=,\r\n' + CSV);
        IEwindow.document.close();
        IEwindow.document.execCommand('SaveAs', true, fileName + ".csv");
        IEwindow.close();
    } else {
        var uri = 'data:application/csv;charset=utf-8,%EF%BB%BF,' + encodeURIComponent(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return true
    {
        return true;
    } else { // If another browser,
        return false;
    }
    return false;
}

function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob(["\ufeff" + csv], {
        type: "text/csv;charset=utf-8,%EF%BB%BF"
    });
    //var uri = 'data:application/csv;charset=utf-8,%EF%BB%BF,' + encodeURIComponent(CSV);
    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
}

function export_table_to_csv(table, filename) {
    var csv = [];
    var rows = $(table).find("tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [],
            cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(","));
    }

    // Download CSV
    download_csv(csv.join("\n"), filename);
}

var quote = function (text) {
    return '"' + text.replace('"', '""') + '"';
}

var isEmpty = function (value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}
var hasProperty = function (obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return true;
    }
    return false;
}
var isFunction = function (value) {
    return typeof value == 'function';
}

$.fn.exists = function () {
    return this.length > 0;
};

$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};


/**
 * 숫자에 콤마를 넣어준다
 * 99999 --> 99,999
 * @param val
 * @returns {string|*}
 */
function fnCommaNumberFormat(val) {
    if (typeof val == 'undefined') return "-";
    if ($.isNumeric(val) === false) return val;
    var inNum = parseFloat(val);
    if (inNum === 0) return val;
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (inNum + '');
    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
    return n;
}

function makeErrorMsg(msg) {
    alert(msg)
    return false
}

function message(code, msg) {
    alert('[' + code + ']' + msg)
    return false
}