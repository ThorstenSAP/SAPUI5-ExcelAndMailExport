sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV',
	"sap/m/MessageBox"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator, Export, ExportTypeCSV, File, MessageBox) {
	"use strict";


	var aFields = ["Name", "Category", "Price"];

	return BaseController.extend("sap.ui.demo.worklist.controller.Worklist", {

		formatter: formatter,


		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
		onInit : function () {

		},
		

		

		exportToExcel : function(oEvent){		
			var oExport = new Export({
				exportType: new ExportTypeCSV({
					separatorChar: ";"
				}),

				models: this.getView().getModel("dataModel"),
				rows:{
					path : "/ProductCollection"
				},
				columns : this._createExcelExportColumns()
			});

			//TESTING PURPOSE ONLY -> check if you receive a error or if you receive the content at the console
			// oExport.generate().catch(function(eMsg){
			// 	console.error(eMsg);
			// }).done(function(sContent){
			// 	console.log(sContent);
			// }).then(function (){
			// 	this.destroy();
			// });


			oExport.saveFile(); //creates an promise oExport.generate() and then download the file

		},

		_createExcelExportColumns : function(){
			//loop over the required fields (aFields) and create the columns array for the export config
			var oColumns = [];
				aFields.forEach(function(eField){
					var column = {
						name: eField,
						template: {
							content: "{" + eField + "}"
						}
					}
					oColumns.push(column);
				});
			return oColumns;
		},

		exportToMail : function(oEvent){
		var aData = this.getModel("dataModel").getProperty("/ProductCollection");
		var sElements = "";
		
		//create the header line for the content 
		aFields.forEach(function(element){
			sElements += element + " \t ";
		});
		sElements += "\n";
		
        // Loop through the model data and get all elements in the array aFields
        aData.forEach(function(element) {
			aFields.forEach(function(eField){
				sElements += element[eField] + " \t ";
			});
			sElements += "\n";
        });
		
		// Open email client window and prepopulate with info
		sap.m.URLHelper.triggerEmail("", "sample Subject", sElements);
		},

	});
});
