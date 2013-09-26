var App = function(){
    $('.logoutButton').onButtonTap(function(){
        window.location = '/logout';   
    });

    this.registerEvents();
    refreshListExpenses();
}

App.prototype.registerEvents = function(){
    this.registerAdd();
    this.registerView();
    this.registerFilterByPeriod();
    this.registerFilterByTag();
    if (typeof(localStorage) !=="undefined" && 
            window.localStorage['tags'] === undefined) {
        window.localStorage['tags'] = JSON.stringify({
            tags : ["food", "gas"]
        });
    }
}

App.prototype.registerFilterByPeriod = function(){
    $('#filterWithPeriodButton').onButtonTap(function(){
        //var fromDate = new Date($('#fromDate').val());
        //var toDate = new Date($('#toDate').val());
        var dateString = $('#fromDate').val();
        var dateArray = dateString.split('-');

        var year = parseInt(dateArray[0]);
        var month = parseInt(dateArray[1]);
        var day = parseInt(dateArray[2]);

        var fromDate = new Date();
        fromDate.setFullYear(year, month - 1, day);
        var fromMillis = fromDate.getTime();

        var dateString = $('#toDate').val();
        var dateArray = dateString.split('-');

        var year = parseInt(dateArray[0]);
        var month = parseInt(dateArray[1]);
        var day = parseInt(dateArray[2]);

        var toDate = new Date();
        toDate.setFullYear(year, month - 1, day);
        var toMillis = toDate.getTime();

        if(fromMillis > toMillis) {
            alert("Illegal date selection. Please make sure the 'from' date is before the 'to' date.");
            return;
        }


        this.ajaxFormJSON(
            {
                fromDate: fromMillis,
                toDate: toMillis
            },
            '/db/receipts/period',
            function success(data){
                drawPieChart(data);
            },
            function error(xhr, status, err){
                alert('Could not sort by date!');
            });
    }.bind(this));
}

App.prototype.registerFilterByTag = function(){
    $('#filterWithTagButton').onButtonTap(function(){
        var tags = document.getElementsByClassName('filteringTags');
        var tagNames = [];
        for(var i = 0; i < tags.length; i++){
            tagNames.push(tags[i].innerHTML.substring(1));
        }
        if(tagNames.length === 0) {
            $('#barChart').empty();
            return;
        }

        this.ajaxFormJSON(
            {
                tags: tagNames,
            },
            '/db/receipts/tags',
            function success(data){
                drawBarChart(data);
            },
            function error(xhr, status, err){
                alert('Could not sort by tag!');
            });
    }.bind(this));
}

App.prototype.registerAdd = function(){
    $('#addButton').onButtonTap(function(){
        ////DATE + TIME
        var dateString = $('#addDate').val();
        var dateArray = dateString.split('-');

        var year = parseInt(dateArray[0]);
        var month = parseInt(dateArray[1]);
        var day = parseInt(dateArray[2]);

        var timeString = $('#addTime').val();
        var timeArray = timeString.split(':');
        var hours = parseInt(timeArray[0]);
        var minutes = parseInt(timeArray[1]);
        var date = new Date(year, month - 1, day, hours, minutes, 0, 0);
        var millis = date.getTime();
        ///////////

        var title = $('#expenseTitle').val();
        var myPhoto = $('#img');
        var photoString = null;
        if(myPhoto.attr('src') !== undefined) {
            photoString = myPhoto.attr('src').substring(23);
        }

        var amount = $('#addAmount').val();

        var tags = $('.addedTags');
        var tagNames = [];
        $.each(tags, function (index, val) {
            tagNames[index] = val.innerHTML.substring(1);
        });
        
        if(typeof(localStorage) !== undefined) {
            var localTags = JSON.parse(window.localStorage['tags']).tags;
            var tempArr = localTags.concat(tagNames);
            var uniqueArray = tempArr.filter(function(elem, pos) {
                return tempArr.indexOf(elem) == pos;
            });
            window.localStorage['tags'] = JSON.stringify ({
                tags : uniqueArray
            });
            //restart autocomplete..
            makeAutoComplete('destroy', '#addTags', '#addedTags', 'addedTags', JSON.parse(window.localStorage['tags']).tags);
            makeAutoComplete('init', '#addTags', '#addedTags', 'addedTags', JSON.parse(window.localStorage['tags']).tags);
        }

        if(this.checkValidationErrors(title, amount, tagNames) === true)
            return;

        this.ajaxFormJSON(  
                {
                    name: title,
                    date: millis,
                    amount: amount,
                    tags: tagNames,
                    photo: photoString
                },
                '/db/me/createReceipt',
                function success(data){
                    refreshListExpenses();
                    $('#expenseTitle').val("");
                    $('#myphoto').empty();
                    $('#addAmount').val("");
                    $('#addedTags').empty();
                    $.mobile.changePage("#recentExpenses");

                },
                function error(xhr, status, err){
                    console.log(JSON.stringify(err));
                    alert("Could not add expense");
                });
    }.bind(this));
}

App.prototype.checkValidationErrors = function(title, amount, tagNames) {
    var pattern = /^[a-zA-Z_\.0-9\s]{1,20}$/;
    var i = 0;
    var errors = [];
    $('#expenseErrorList').empty();
    if(title.length === 0) {
        errors[i++] = "Title needs to be added.";
    } else if(!title.match(pattern)) {
        errors[i++] = "Title is invalid.";
    }

    if(amount.length === 0) {
        errors[i++] = "An amount needs to be entered.";
    } else if(parseInt(amount) < 0) {
        errors[i++] = "Amount has to positive.";
    }

    if(tagNames.length === 0) {
        errors[i++] = "Tags needs to be added.";
    }
    for(var j = 0; j < i; j++) {
        var e = $('<li class="error">'+errors[j]+'</li>');
        $("#expenseErrorList").append(e);
    }
    return (i>0);
}

App.prototype.getMillis = function(){
        var dateString = $('#addDate').val();
        var dateArray = dateString.split('-');

        var year = parseInt(dateArray[2]);
        var month = parseInt(dateArray[0]);
        var day = parseInt(dateArray[1]);

        var timeString = $('#addTime').val();
        var timeArray = timeString.split(':');
        var hours = parseInt(timeArray[0]);
        var minutes = parseInt(timeArray[1]);
        var seconds = parseInt(timeArray[2]);
        var date = new Date(year, month, day, hours, minutes, seconds, 0);

        var millis = date.getTime();
}

App.prototype.registerView = function(){
    $('#viewAllButton').click(function(){
        this.ajaxGetJSON(
            {},
            '/db/receipts',
            function success(data){
                listExpenses(data);
            },
            function error(xhr, status, err){
                // alert(JSON.stringify(err));
            }
            )
    }.bind(this));
}

App.prototype.ajaxFormJSON = function(json, url, onSuccess, onError){
    var data = new FormData();
    for (var key in json){
        data.append(key, json[key]);
    }

        $.ajax({
            url: url,
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: onSuccess,
            error: onError});
}

App.prototype.ajaxGetJSON = function(json, url, onSuccess, onError){
    var data = new FormData();
    for (var key in json){
        data.append(key, json[key]);
    }

        $.ajax({
            url: url,
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'GET',
            success: onSuccess,
            error: onError});
}
