var urlPrefix = "/_vti_bin/listdata.svc/Questions?&$top=9999&&$filter=%28%28IsActive%20eq%20true)%20and%20(SkillValue%20eq%20%27"
var urlSuffix = "%27))"

$(document).ready(function (){
  // var x2js = new X2JS(xml);
  // console.log(x2js.xml2json());
  addPageHeader(getParameterByName("SkillValue"));
  fetchQuestionsData(getParameterByName("SkillValue"));
});

function fetchQuestionsData(skillValue) {
  var url = urlPrefix + skillValue + urlSuffix;
  getJSONData(url).done(formQuestionsHTML).fail(showError);
}

function showError() {
  $("questionsForm").html("<p>Sorry, some Error occurred while fetching questions. Please try again later.");
}

function formQuestionsHTML(apiResponse) {
  var questionsFormHTML = '';
  apiResponse.d.results.forEach(function(eachQuestion, questionIdx) {
    questionsFormHTML += '<div class="form-group row">';
    questionsFormHTML += '<label for="Q1" class="col-11 col-md-12 offset-md-0">Q' + (questionIdx + 1) + ': ' + eachQuestion.Question + '</label>';
    eachQuestion.Options.split(',').forEach(function(eachOption, optionIdx) {
      questionsFormHTML += '<div class="col-md-12 offset-md-0 col-11">';
      questionsFormHTML += '<div class="form-check">';
      questionsFormHTML += '<label class="form-check-label">';
      questionsFormHTML += '<input type="radio" name="Q' + (questionIdx + 1) + '" value="' + (optionIdx + 1) + '"  class="form-check-input"> ';
      questionsFormHTML += eachOption;
      questionsFormHTML += '</label>';
      questionsFormHTML += '</div>';
      questionsFormHTML += '</div>';
    });
    questionsFormHTML += '</div>';
  });
  $('#questionsForm').html(questionsFormHTML);
}

function addPageHeader(skillValue) {
  // Add header to page
  var headerHTML = '<h1>' + skillValue + ' Assessment</h1>'
  $('#headerDiv').html(headerHTML);
}
