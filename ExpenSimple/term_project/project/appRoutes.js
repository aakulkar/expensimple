var User = require('./User');
var Receipt = require('./Receipt');

module.exports = function (app) {

    //View all receipts on homepage(sorted in reverse chronological order)
    app.get('/db/receipts', function(req, res){
        if(!req.user){
            res.status(401);
        }
        else{
            //console.log(req.user.username);
            Receipt.find({user: req.user.username}, 'name date creator amount id', 
                {   sort:[['date',-1]],
                    limit: 10
                },
                function(err, receipts){
                    if(err)
                        res.send(err);
                    else
                        //console.log(receipts);
                        res.send(receipts);
            });
        }
    });

    app.post('/db/receipts/period', function(req, res){
        if(!req.user){
            res.status(401);
        }
        else{
            var fromDate = req.body.fromDate;
            var toDate = req.body.toDate;

            var query = Receipt.find();
            //Get the receipts from a start date to an end date
            query.where('user').equals(req.user.username).where('date').gte(fromDate).lte(toDate).exec(function(err, receipts){
                if(err)
                    res.send(err);
                else
                    console.log(receipts);

                    //Analyze receipts to get the amount of money spent on each tag.
                    var getExpensesByTag = function(receipts){
                        var obj = new Object();
                        for(var i = 0; i < receipts.length; i++){
                            var tags = receipts[i].tags;
                            var numTags = tags.length;
                            var value = receipts[i].amount/numTags;
                    
                            for(var j = 0; j < tags.length; j++){
                                if(obj.hasOwnProperty(tags[j])){
                                    obj[tags[j]] += value;
                                }
                                else{
                                    obj[tags[j]] = value;
                                }
                            }
                        }
                        return obj;
                    }
                    var analytics = getExpensesByTag(receipts);
                    //console.log(analytics);
                    res.send(analytics);
            });
        }

    });

    //Gets the receipts of a certain type that have been created in the last 6 months.
    app.post('/db/receipts/tags', function(req, res){
        if(!req.user){
            res.status(401);
        }
        else{
            var tagsString = req.body.tags;
            var tags = tagsString.split(',');
            //console.log(tags);
            //console.log(tags.length);
            var query = Receipt.find();
            var oneMonth = 15768000000/6;
            var sixMonthsAgo = (new Date()).getTime() - 15768000000;
            query.where('user').equals(req.user.username).where('date').gte(sixMonthsAgo).exec(function(err, receipts){
                if(err){
                    console.log('ERROR!');
                    console.log(err);
                    res.send(err);
                }
                else{
                    //console.log(receipts);

                    //Filters receipts by a certain tag(s)
                    var filterReceipts = function(receipts, tags){
                        var filtered = [];
                        for(var i = 0; i < receipts.length; i++){
                            for(var j = 0; j < tags.length; j++){
                                if(receipts[i].tags.indexOf(tags[j]) !== -1){
                                    filtered.push(receipts[i]);
                                    break;
                                }
                            }
                        }
                        return filtered;
                    };

                    //Figures out what time period in the last 6 months the filtered receipts belong to
                    var filterTimePeriod = function(receipts){
                        var receiptsByPeriod = [[],[],[],[],[],[]];
                        for(var i = 0; i < receipts.length; i++){
                            var index = Math.floor((receipts[i].date - sixMonthsAgo)/oneMonth);
                            console.log(index);
                            receiptsByPeriod[index].push(receipts[i]);
                        }
                        return receiptsByPeriod;
                    };

                    /*console.log("Tags: " + tags);
                    console.log("Number of tags: " + tags.length);
                    console.log("Number of Receipts: " + receipts.length);
                    console.log(receipts[0].tags);*/
                    var filteredResults = filterReceipts(receipts, tags);
                    var filteredByDateResults = filterTimePeriod(filteredResults);

                    //console.log("Filtered: " + results)
                    res.send(filteredByDateResults);
                }
            });
        }
    });

    //Create a receipt
    app.post('/db/me/createReceipt', function(req, res){
        if(!req.user){
            res.status(401);
        }
        else{
            /*console.log(req.body.photo.length);
            console.log("Name: ", req.body.name);
            console.log("Date: ", req.body.date);
            console.log("User: ",req.user.username);
            console.log("Date: ", req.body.date);
            console.log(typeof(req.body.date));*/

            var rec = new Receipt({name: req.body.name, date: req.body.date, user: req.user.username, 
                amount: req.body.amount, tags: req.body.tags.split(','), photo: req.body.photo});
            rec.save(function(err) {
                if(err) {
                    console.log(err);
                    return res.send({'err' : err});
                }
                //Update user's receipts
                req.user.receipts.push(rec.id);
                req.user.save();
                return res.send('success');
            });

        }
    });

    //Get a particular receipt(so you can see the photo)
    app.post('/db/getReceipt', function(req, res){
        if(!req.user){
            res.status(401);
        }
        else{
            //console.log(req.body.id);

            Receipt.findById(req.body.id, function(err, receipt){
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                    res.send(receipt);
                }
            });

        }
    });
}
