var Ajax = {
    applyToEvaluation: function(evaluationID, message, callback) {
        $.ajax({
            type: "POST",
            url: "evaluations/apply",
            data: {evaluation_id: evaluationID, message: message}
        }).done(callback);
    },
    createStandards: function(name, details, callback) {
        $.ajax({
            type: "POST",
            url: "/standards",
            data: {
                name: name,
                details: details
            }
        }).done(callback);
    },
    updateStandards: function(id, name, details, callback) {
        $.ajax({
            type: "PUT",
            url: "/standards/" + id,
            data: {
                id: id,
                name: name,
                details: details
            }
        }).done(callback);
    },
    respondToApplication: function(id, route, callback) {
        $.ajax({
            type: "POST",
            url: route,
            data: {id: id}
        }).then(callback);
    },
    respondToSubmittedEvaluation: function(data, route, callback) {
        $.ajax({
            type: "POST",
            url: route,
            data: data
        }).then(callback);
    },
    respondToUserActivation: function(data, route, callback) {
        $.ajax({
            type: "POST",
            url: route,
            data: data
        }).then(callback);
    }
};