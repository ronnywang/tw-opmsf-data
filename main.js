var list = ['action-plan', 'action-plan-category'];
var records = {};

var read_all_list = function() {
    var promises = [];
    for (let id of list) {
        promises.push($.get('data/' + id + '.csv').then(function(text){
            records[id] = [];

            var ret = $.csv.toArrays(text);
            for (var i = 1; i < ret.length; i ++) {
                record = {};
                for (var j = 0; j < ret[0].length; j ++) {
                    record[ret[0][j]] = ret[i][j];
                }
                records[id].push(record);
            }
        }));
    }

    return Promise.all(promises);
}
