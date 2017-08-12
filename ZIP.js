/**
 * Author: Peter Dragicevic [peter@petschko.org]
 * Authors-Website: http://petschko.org/
 * Date: 14.07.2017
 * Time: 22:06
 */

/**
 * Creates a new ZIP Object
 *
 * @constructor - ZIP
 */
function ZIP() {
	this.files = [];
}

/**
 * Adds a new File to the ZIP-File
 *
 * @param {RPGFile} rpgFile - RPG-File to add
 */
ZIP.prototype.addFile = function(rpgFile) {
	this.files.push(rpgFile);
};

var saveData =
	window.navigator.msSaveBlob ||
	function (blob, fileName)
{
	var a = document.createElement("a");
    a.style = "display: none";
	a.href = window.URL.createObjectURL(blob);
	a.download = fileName || '';
	a.click();
	a.remove();
	window.URL.revokeObjectURL(url);
};

/**
 * Turns all Files into a ZIP-File and Download it
 */
ZIP.prototype.save = function() {
	if(this.files.length < 1)
		return;

	var jsZip = new JSZip();

	// Add all Files to the ZIP
	var addedFiles = 0;
	for(var i = 0; i < this.files.length; i++) {
		if(this.files[i].content !== null) {
			jsZip.file(this.files[i].name + '.' + this.files[i].extension, this.files[i].content);
			addedFiles++;
		}
	}

	// Download ZIP
	if(addedFiles > 0) {
		var fileName = this.files[0].name + '.zip';
		jsZip.generateAsync({type:'blob'}).then(function(blob) {
			saveData(blob, fileName);
		});
	}
	else
		alert('Can\'t offer ZIP-Download. ZIP would be empty...');
};
