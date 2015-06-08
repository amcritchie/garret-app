var DepartmentSummary = {

    load: function (department, evaluation) {
        debugger;
    },
    createHTML: function (department, evaluation) {
        var tableHTML = '<div class="border-green align-center"><h1>' + department.departmentName + '</h1><table class="table table-bordered align-center"><thead><tr><th class="col-xs-7">Question</th><th class="col-xs-2">Fulfillment</th><th class="col-xs-3">Comment</th></tr></thead><tbody>';
        var departmentQuestions = $.grep(evaluation.scores, function (e) {
            return e.dep == department.departmentName;
        });
        var actualScore = 0;
        var potentialScore = 0;
        departmentQuestions.forEach(function (question) {
            actualScore += question.weightedScore;
            potentialScore += question.potentialWeightedScore;
            var theScore = (question.score === null) ? 'N/A' : question.weightedScore + ' / ' + question.potentialWeightedScore;
            tableHTML = tableHTML + '<tr><th>' + question.question + '</th><th>' +
                theScore + '</th><th>' + question.explanation + '</th>';
        });
        var total =
            '<div class="background-green">' +
                '<h4 class="margin-0 padding-15">' +
                    'Total ' + actualScore + '/' + potentialScore + ' - ' + ((Math.floor((actualScore / potentialScore) * 100)) || 0) + '%' +
                '</h4>' +
            '</div>';
        tableHTML = tableHTML + '</tbody></table><h4>' + department.departmentDescription + '</h4>' + total +
            '</div><br>';
        return tableHTML;
    }
};