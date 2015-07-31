var DepartmentSummary = {

    load: function (department, evaluation) {
        debugger;
    },
    createHTML: function (department, evaluation) {
        var tableHTML = '<div class="page-break border-green align-center"><h1>' + department.departmentName + '</h1><table class="table table-bordered align-center"><thead><tr><th class="col-xs-7">Question</th><th class="col-xs-2">Fulfillment</th><th class="col-xs-3">Comment</th></tr></thead><tbody>';
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
        var courseAndBeverageHTML = '';
        if ((department.departmentName === 'as') || (department.departmentName === 'Kitchen')) {
            courseAndBeverageHTML =
                '<h2>Courses</h2>' +
                '<h4><div class="col-lg-4">First Course: <h6>' + evaluation.courses.crs1 +
                '</h6></div><div class="col-lg-4">Main Course : <h6>' + evaluation.courses.crs2 +
                '</h6></div><div class="col-lg-4">Dessert: <h6>' + evaluation.courses.crs3 + '</h6></div></h4>' +
                '<br><br>' +
                '<h2>Beverages</h2>' +
                '<h4><div class="col-lg-2"></div><div class="col-lg-4">Drink 1: <h6>' + evaluation.beverages.bev1 +
                '</h6></div><div class="col-lg-4">Drink 2: <h6>' + evaluation.beverages.bev2 + '</h6></div><div class="col-lg-2"></div></h4>' +
                '<br><br><br>'
            ;
        }
        var total =
            '<div class="background-green">' +
            '<h4 class="margin-0 padding-15">' +
            'Total ' + actualScore + '/' + potentialScore + ' - ' + ((Math.floor((actualScore / potentialScore) * 100)) || 0) + '%' +
            '</h4>' +
            '</div>';
        tableHTML = tableHTML + '</tbody></table><h4>' + department.departmentDescription + '</h4>' + courseAndBeverageHTML + total +
            '</div><br>';
        return tableHTML;
    }
};