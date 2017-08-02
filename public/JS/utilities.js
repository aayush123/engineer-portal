//Get the relative web url
var relativeWebUrl='/sites/sdpt/skillAssessment';
var loggedInUserId='';
var formDigest='';

//get the querystring parametere name
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
     name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// get the form-request digest
function GetRequestDigest(){
    return jQuery.getJSON(relativeWebUrl+'/_api/contextinfo'); // use data.d.GetContextWebInformation.FormDigestValue
}

//gets the json response for the valid restful URL. This returns data with promise
function getJSONResponse(restUrl){
     return jQuery.getJSON(relativeWebUrl+restUrl);
  }

//For the valid email id it will return a json response with a promise
function getCurrentUserInfo()
{
    return jQuery.getJSON(relativeWebUrl+'/_api/web/currentuser?&$select=Title,LoginName,Email');
}

//update list item via restUrl//json update stub
function updateItemToList(item, requestDigest)
{
  return jQuery.ajax({
        url: item.__metadata.uri,
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": requestDigest, //$("#__REQUESTDIGEST").val(),
            "X-HTTP-Method": "MERGE",
            "If-Match": item.__metadata.etag
        }
    });
}

//update list item via restUrl without request digest --might not work
function updateItemToList(item)
{
  return jQuery.ajax({
        url: item.__metadata.uri,
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(item),
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-HTTP-Method": "MERGE",
            "If-Match": item.__metadata.etag
        }
    });
}

//Add item to list and returns a promise
function addItemToList(listName, itemProperties)
{
  return  $.ajax({
        url: relativeWebUrl + "/_vti_bin/listdata.svc/" + listName,
        type: "POST",
        processData: false,
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(itemProperties),
        headers: {
            "Accept": "application/json;odata=verbose"
        }
     });
}

function getPageName(url) {
		    var index = url.lastIndexOf("/") + 1;
		    var filenameWithExtension = url.substr(index);
		    var filename = filenameWithExtension.split(".")[0]; // <-- added this line
		    return filename;                                    // <-- added this line
		}
