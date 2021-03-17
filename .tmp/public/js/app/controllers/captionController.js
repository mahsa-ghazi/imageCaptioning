myAPP.controller('captionController', function ($scope) {
    $scope.load = function() {
      $(document).ready(function () {
        $('#title').text('approve captions');
        var url =  window.location.protocol + "//" + window.location.host + "/api/v1/caption/list";
        var source = {
            datatype: "json",
            datafields: [
                { name: 'sentences', type: 'string'},
                { name: 'caption', type: 'string'},
                { name: 'id', type: 'number'},  
                { name: 'imageId', type: 'number'} 
            ],
            updaterow: function (rowid, rowdata, commit) {
                console.log(rowid, rowdata, commit)
                var recordId = rowdata.id;
                var translatedData = rowdata.sentences;
                $.ajax({
                    url: "/api/v1/caption/edit",
                    type: "GET",
                    data: { 
                        recordId: recordId,
                        translatedData: translatedData
                    },
                    success: function(response) {
                        var imageSrc = response.data;
                        $("#rowImage").attr("src", imageSrc);
                    },
                    error: function(xhr) {
                    }
                  });

               
            },
            url: url,
            id: 'id',
            cache: false,
            filter: function()
            {
                $("#grid").jqxGrid('updatebounddata', 'filter');
            },
            root: 'Rows',
            beforeprocessing: function(data)
            {		
                source.totalrecords = data.TotalRows;					
            }
        };
        var dataadapter = new $.jqx.dataAdapter(source, {
            loadError: function(xhr, status, error)
            {
                alert(error);
            }
        });
        $("#grid").jqxGrid(
        {
            source: dataadapter,
            virtualmode: true,
            rendergridrows: function()
            {
                  return dataadapter.records;     
            },
            width: 1030,
            pageable: true,
            theme: 'energyblue', 
            editable: true,
            autoheight : true, 
            columnsresize: true,
            selectionmode: 'checkbox',
            pagesize:20,
            columns: [
                { text: 'انگلیسی', datafield: 'caption', width:450 , cellsalign: 'left', align: 'center', editable: false },
                { text: 'ترجمه فارسی', datafield: 'sentences', width: 450, cellsalign: 'right', align: 'center' },
                { text: 'نمایش', datafield: 'Edit',width: 100, align: 'center', columntype: 'button', cellsrenderer: function () {
                    return "نمایش";
                }, buttonclick: function (row) {

                        $("#window").jqxWindow('open');
                        var selectedRowData = $('#grid').jqxGrid('getrowdata', row);
                        $("#rowImage").removeAttr("src");
                        $('#window').jqxWindow({ title: selectedRowData.caption }); 
                        var imageID = selectedRowData.imageId;
                        $.ajax({
                            url: "/api/v1/caption/loadImage",
                            type: "GET",
                            data: { 
                                imageId: imageID
                            },
                            success: function(response) {
                                var imageSrc = response.data;
                                $("#rowImage").attr("src", imageSrc);
                            },
                            error: function(xhr) {
                            }
                          });
                    }
                } 
           ]
        });
       
        $("#infoButton").jqxButton({ template: "info" , width: 120, height: 40});
        $('#window').jqxWindow({
            showCollapseButton: true,
            maxHeight: 400, 
            maxWidth: 700, 
            minHeight: 200, 
            minWidth: 200, 
            height: 300, 
            width: 500, 
            autoOpen: false,
            theme: 'energyblue',
            title: "Image Preview"
         });
        
        $('#infoButton').on('click', function () { 
            $("#notice").fadeOut();
            var getselectedrowindexes = $('#grid').jqxGrid('getselectedrowindexes');
            if (getselectedrowindexes.length > 0)
            {
                var totalId = [];
                getselectedrowindexes.forEach((currentRowIndex) => {
                    var selectedRowData = $('#grid').jqxGrid('getrowdata', currentRowIndex);
                    if(selectedRowData != undefined) {
                        totalId.push(selectedRowData.id);
                    }
                });
                var url =  window.location.protocol + "//" + window.location.host + "/api/v1/caption/saveCorrectTraslation";
                $.post( url,
                {
                    totalId: totalId
                },
                function(data, status) {
                    console.log(data, status)
                    $("#notice").fadeIn();
                    $("#grid").jqxGrid('updatebounddata', 'cells');
                    $("#grid").jqxGrid("clearselection");
                });
            }        
        });
      });
    };
        $scope.load();
  });