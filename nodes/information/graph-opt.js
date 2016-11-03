var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');
var ip = require("ip");

function GraphOpt(params) {
    kangaBaseNode.call(this, params);
    this.title = params.title;
    this.graphStyle = params.graph_style;
    this.xAixsFieldName = params.x_aixs_field_name;
    this.yAixsFieldNames = params.y_aixs_field_names;
    this.yAixsFieldNamesArray = this.yAixsFieldNames.split(',').map(function(s) { return s.trim() });
    this.majorUnit = Number(params.major_unit);
    this.yLabelFormat = params.y_label_format;
    this.locale = params.locale;
}

extend(GraphOpt, kangaBaseNode);

GraphOpt.prototype._execute = function () {
    this.klogger.debug('GraphOpt ' + JSON.stringify(this.eventType));

    switch (this.eventType) {
        case KANGA_EVENT.DATA:
            if(this.id === undefined) {
                this.id = new Date().getTime() + '_' + ip.address();
            }
            var graphOpt = {};
            graphOpt.id = this.id;
            graphOpt.ip = ip.address();
            graphOpt.title = this.title;
            graphOpt.style = this.graphStyle;
            
            graphOpt.majorUnit = this.majorUnit;
            graphOpt.yLabelFormat = this.yLabelFormat;

            var date = new Date(Number(this.message[this.xAixsFieldName]));

            graphOpt.value = {};
            graphOpt.value.x = date.toLocaleDateString(this.locale) + ' ' + date.toLocaleTimeString(this.locale);
            for (var i in this.yAixsFieldNamesArray) {
                var fieldName = this.yAixsFieldNamesArray[i];
                graphOpt.value[fieldName] = Number(this.message[fieldName]);
            }


            this.message = graphOpt;
            this.event.root._header_.name = graphOpt.id;
            this.event.root[graphOpt.id] = graphOpt;
            delete this.root[this.messageName];

            this.klogger.debug('GraphOpt ' + JSON.stringify(this.message));
            this.klogger.debug('GraphOpt ' + JSON.stringify(this.event));
            
            console.log(this.message);
            break;
        case KANGA_EVENT.COLLECTION:
            break;
        case KANGA_EVENT.TIME_TICK:
            break;
        case KANGA_EVENT.EOF:
            break;
        case KANGA_EVENT.SYSTEM_LOG:
            break;
        default:
            break;
    }
    return this.event;
};

module.exports = GraphOpt;