var list = ['action-plan', 'action-plan-category', 'action-plan-milestone', 'action-plan-info'];
var records = {};

var record_search = function(records, cond) {
    var ret = [];
    for (var record of records) {
        var miss = false;
        for (var k in cond) {
            if (record[k] != cond[k]) {
                miss = true;
                break;
            }
        }
        if (miss) {
            continue;
        }
        ret.push(record);
    }
    return ret;
};

var record_find = function(records, cond) {
    return record_search(records, cond)[0];
};

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
