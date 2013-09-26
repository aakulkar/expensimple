
//Using $(document).ready() here as I want this to happen only once 
//and is independent of jquery mobile.
$(document).ready(function(){
	//Binding tags...
	bindingTags('#addTags', '#addedTags', 'addedTags');
	bindingTags('#filteringTags', '#selectedTags', 'filteringTags');
	// console.log("init completed!");

});

//On pageload for addExpense, it puts the default time/date on the box.
$('#addExpense').live('pageshow', function(event, ui){
  	var now = new Date();
    var month = (now.getMonth() + 1);               
    var day = now.getDate();
    if(month < 10) 
        month = "0" + month;
    if(day < 10) 
        day = "0" + day;

    var today = now.getFullYear() + '-' + month + '-' + day;
    $('#addDate').val(today);
    $('#addTime').val(now.toLocaleTimeString());
});



//This function only gets called when App is created.
function refreshListExpenses() {
	//Clear List Here
	$('#expenseList').empty();
	$('#viewAllButton').click();
}

function makeAutoComplete(action, input, div, type, obj) {
	$(input).betterAutocomplete(
			action, 
			obj, 
			{ autoHighlight:false }, 
			{
				select : function(result, $input) {
					if($('.highlight').length === 0) {
						makeTag($input, div, type);
						return;
					}
					if(result !== undefined) {
						$input.val(result.title);
						makeTag($input, div, type);
					}
				}
			}
		);
}

// TAGS + AUTOCOMPLETE
///////////////////////////////////////////////////////////////////
function bindingTags(input, div, type) {
	//adding autocomplete to the tag element
	var obj;
	if(typeof(localStorage) !== undefined) {
		obj = JSON.parse(window.localStorage['tags']).tags;
	} else {
		obj = [];
	}
	makeAutoComplete('init', input, div, type, obj);

	// adding tags on enter
	$(input).bind('keydown', function(event) {
	if(event.which === 13) {
		//enter key pressed
		if($('.better-autocomplete').css('display') === "block") {
			return;
		}
		makeTag(input, div, type);
	}
	});


}

function makeTag(input, div, type) {
	
	var val = $(input).val();
	if(val.length === 0) {
		return;
	}
	$(input).val('');
	var tag = $('<button class="tags '+ type +'" data-inline="true" data-mini="true" data-icon="delete" data-iconpos="right"></button>');
	if(val[0]==='#') {
		tag.html(val);
	}else {
		tag.html('#'+val);
	}
	$(div).append(tag);
	tag.button().click(deleteMyTag);
}

function deleteMyTag() {
	var p = this.parentElement;
	$(p).remove();
}

///////////////////////////////////////////////////////////////////////////

// Remove this method once the server gets setup..
function addTestExpenses(price) {
	price = price || 25;
	var d = new Date();
	listExpense(d, "title", price);
	d.setDate(2);
	d.setMonth(2);
	listExpense(d, "title", price);
	return null;
}

function listExpenses(data) {
	for (var i = 0; i < data.length; i++) {
		listExpense(new Date(data[i].date), data[i].name, data[i].amount, data[i]._id);
	};
}

function listExpense(dateObj, title, price, id) {
	var dateMatcher = dateObj.getYear()+dateObj.getMonth()+dateObj.getDate();
	var list = $('#expenseList');
	var date = list.children('#date'+dateMatcher)[0];
	
	if(date === undefined || date === null) {
		date = $('<li data-role="list-divider"></li>')
			.text(dateObj.toLocaleDateString())
			.attr('id', 'date'+dateMatcher)
			.appendTo(list);
	}
	
	$('<li><a id="' + id + '"href="#" onclick="getReceipt(id);"><h3>' + title + '</h3><p>$'+ price + '</p><p class="ui-li-aside"><strong>'+ dateObj.toLocaleTimeString() +'</strong>PM</p></a></li>')
	.insertAfter(date);
	list.listview("refresh");
}

function getReceipt(id){
	//alert(id);

	ajaxFormJSON(  
        {
           	id: id
        },
        '/db/getReceipt',
        function success(data){
        	
        	// console.log(data);
        	var img = $('<img id="receiptImg"></img>');
   			var div = $('#viewReceiptInfo');
   			div.empty();
   			if(data.photo !== "null" && data.photo.length !== 0) {
	        	var c = "data:image/jpeg;base64,"+data.photo;
	    		img.attr('src', c);
	    		div.append(img);
        	}
    		$('<p>Title: '+data.name+'</p>').appendTo(div);
    		$('<p>Date Added: '+new Date(data.date).toLocaleDateString()+'</p>').appendTo(div);
    		$('<p>Amount: '+data.amount+'</p>').appendTo(div);
    		$('<p>Tags: '+data.tags+'</p>').appendTo(div);

    		
    		$.mobile.changePage('#viewReceiptDialog');
			//$( "#viewReceiptDialog" ).popup( "open");

       	},
        function error(xhr, status, err){
           	alert("Could not get Receipt");
        });

}

function ajaxFormJSON(json, url, onSuccess, onError){
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
