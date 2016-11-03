Kanga lite Framework & Base Library
============

Quick Start
-----------

### Requirements
[Node.js](https://nodejs.org/en/download/) should be installed first.

To install npm dependencies:

    npm install

### Examples
Read input.json and write output.json

```js
var kangaBase = '../lib/base';
var events = require('events');
var clone = require(kangaBase + '/utils/kanga-common').clone;
var kangaLogger = require(kangaBase + '/utils/kanga-logger');
var kangaEmitter = new events.EventEmitter();
var node = {};

// Create the logger for the given topology
var klogger = new kangaLogger("KangaTopology_Example", 'debug');


// Load all the required bolts
var file_reader = require(kangaBase + "/nodes/spout/file-reader")
var save_to_file = require(kangaBase + "/nodes/sink/save-to-file")

// Create an object with the required set of parameters
var flowchart_from_file_435_params = {}
flowchart_from_file_435_params.klogger = klogger
flowchart_from_file_435_params.output_name = "input"
flowchart_from_file_435_params.file_path = "input.json"
flowchart_from_file_435_params.sleeping_time = "1000"
node["flowchart_from_file_435"] = new file_reader(flowchart_from_file_435_params)

var flowchart_to_file_44_params = {}
flowchart_to_file_44_params.klogger = klogger
flowchart_to_file_44_params.output_file_path = "output.json"
node["flowchart_to_file_44"] = new save_to_file(flowchart_to_file_44_params)



// Define callback functions
var flowchart_from_file_435 = function(){
	node["flowchart_from_file_435"].generateEvents(kangaEmitter.emit.bind(kangaEmitter,"flowchart_from_file_435"), true);
}
var flowchart_to_file_44 = function(event, isClone){
	event = node["flowchart_to_file_44"].execute((isClone == true) ? clone(event) : event);
	kangaEmit("flowchart_to_file_44",event, true);
}

// Register the call back functions with kangaEmitter
kangaEmitter.on("start",flowchart_from_file_435)

kangaEmitter.on("flowchart_from_file_435",flowchart_to_file_44);

kangaEmitter.emit("start");
klogger.info("Flow Started");

function kangaEmit(eId, event, isClone) {
    if (event != null) {
        if (event.constructor == Array) {
            for (var i = 0; i < event.length; i++) {
                kangaEmitter.emit(eId, event[i], isClone);
            }
        } else {
            kangaEmitter.emit(eId, event, isClone);
        }
    }
}

```

### Testing ([mocha](https://mochajs.org/), [benchmark](https://benchmarkjs.com/))

To run the test suite, run

    npm test

To run only a specific test suite, run

    mocha test/<test suite name>.js

To benchmark only a specific test suite, run

    node benchmark/perf_<test suite name>.js

### Directory structure
    benchmarks: benchmark testing program for each node
    config: sdfsdf
    constants: constant definition for Kanga lite framework
    examples: topology examples
    nodes: spout and functional nodes (algorithms)
    test: mocha unit tests
    utils: utils for Kanga lite framework   


How to get involved
-------------------

We welcome contributions to Kanga.  The procedure for contributing is
outlined below.  (These notes were adapted from those for the
[JerryScript](https://github.com/Samsung/jerryscript) project.)

### Certificate of Origin

Kanga uses the signed-off-by language and process, to give us a clear chain of trust for every patch received.

> By making a contribution to this project, I certify that:  

> (a)	The contribution was created in whole or in part by me and I have the right to submit it under the open source license indicated in the file; or

> (b)	The contribution is based upon previous work that, to the best of my knowledge, is covered under an appropriate open source license and I have the right under that license to submit that work with modifications, whether created in whole or in part by me, under the same open source license (unless I am permitted to submit under a different license), as indicated in the file; or

> (c)	The contribution was provided directly to me by some other person who certified (a), (b) or (c) and I have not modified it.

> (d)	I understand and agree that this project and the contribution are public and that a record of the contribution (including all personal information I submit with it, including my sign-off) is maintained indefinitely and may be redistributed consistent with this project, under the same open source license. 


#### Using the Signed-Off-By Process

We have the same requirements for using the signed-off-by process as the Linux kernel. In short, you need to include a signed-off-by tag in every patch:

"Signed-off-by:" this is a developer's certification that he or she has the right to submit the patch for inclusion into the project. It is an agreement to the Developer's Certificate of Origin (above). **Code without a proper signoff cannot be merged into the mainline.**

You should use your real name and email address in the format below:

> Kanga-DCO-1.0-Signed-off-by: Random J Developer random@developer.example.org


#### How to add DCO every single commit automatically.

It is easy to forget adding DCO end of every commit message. Fortunately there is a nice way to do it automatically. Once you've clone the repository into your local machine, you can add `prepare commit message hook` in `.git/hooks` directory like this:

```
#!/usr/bin/env python

import sys

commit_msg_filepath = sys.argv[1]

with open(commit_msg_filepath, "r+") as f:
	content = f.read()
	f.seek(0, 0)
	f.write("%s\n\nKanga-DCO-1.0-Signed-off-by: <Your Name> <Your Email>" % content)
```

Please refer [Git Hooks](http://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) for more information.

### Development Process


#### Proposals, Get Answers and Report a Bug via Github Issues

If you have a question about Kanga code, have trouble any documentation,
would like to suggest new feature, or find a bug, review the current
Kanga issues in GitHub, and if necessary, create a new issue.

#### Feature development process

The Kanga Project development process is marked by the following highlights:
* The feature development process starts with an author discussing a proposed feature with the Maintainers and Reviewers
  - Open the issue with label 'feature request'
* The Maintainers and Reviewers evaluate the idea, give feedback, and finally approve or reject the proposal.
* The author shares the proposal with the community via **_Github issues with 'feature request' label_**
* The community provides feedback which can be used by the author to modify their proposal and share it with the community again.
* The above steps are repeated until the community reaches a consensus
  according to the community guidelines.
* After a consensus is reached, the author proceeds with the implementation and testing of the feature.
* After the author is confident their code is ready for integration:
  - The author generates a patch and signs off on their code.
  - The author submits a patch according to the patch submission process.
* The Maintainers and Reviewers watch the pull request for the patch, test the code, and accept or reject the patch accordingly.
* After the code passes code review, the Maintainers and Reviewers accept the code(integrated into the master branch), which completes the development process.
* After a patch has been accepted, it remains the authoring developer's responsibility to maintain the code throughout its lifecycle, and to provide security and feature updates as needed.

#### Approval Path for PR(Pull Request)
1. Developer should create/update PR to a given issue or enhancement
2. If Developer works in a team, then peer-review by a colleague developer should be performed
3. If peer-review was OK, then Developer should summon the component's maintainer
4. Maintainer should check the code:
   - make precommit testing is OK (performed automatically)
   - No minor issues (unified implementation style, comments, etc.)
   - No major issues (memory leak, crashes, breakage of ECMA logic, etc.)
5. If Developer has to rework the solution then goto step 3
6. If everything is OK, then Maintainer should approve the PR with +1(or LGTM)
   - Code review can be performed by all the members of the project. However only Maintainer can give binding scores.
7. When the PR get +2(2 LGTM from 2 mainatiners respectively), it should be merged.
### Patch Submission Process

The following guidelines on the submission process are provided to help you be more effective when submitting code to the Kanga project.

When development is complete, a patch set should be submitted via Github pull requests. A review of the patch set will take place. When accepted, the patch set will be integrated into the master branch, verified, and tested. It is then the responsibility of the authoring developer to maintain the code throughout its lifecycle.

Please submit all patches in public by opening a pull request. Patches sent privately to Maintainers and Committers will not be considered. Because Kanga is an Open Source project, be prepared for feedback and criticism-it happens to everyone-. If asked to rework your code, be persistent and resubmit after making changes.

#### 1. Scope the patch

Smaller patches are generally easier to understand and test, so please submit changes in the smallest increments possible, within reason. Smaller patches are less likely to have unintended consequences, and if they do, getting to root cause is much easier for you and the Maintainers and Committers. Additionally, smaller patches are much more likely to be accepted.

#### 2. Sign your work with the Kanga DCO

The sign-off is a simple line at the end of the explanation for the patch, which certifies that you wrote it or otherwise have the right to pass it on as an Open Source patch. The  sign-off is required for a patch to be accepted.

#### 3. Open a Github pull request

#### 4. What if my patch is rejected?

It happens all the time, for many reasons, and not necessarily because the code is bad. Take the feedback, adapt your code, and try again. Remember, the ultimate goal is to preserve the quality of the code and maintain the focus of the Project through intensive review.

Maintainers and Committers typically have to process a lot of submissions, and the time for any individual response is generally limited. If the reason for rejection is unclear, please ask for more information to the Maintainers and Committers.
If you have a solid technical reason to disagree with feedback and you feel that reason has been overlooked, take the time to thoroughly explain it in your response.

#### 5. Code review

Code review can be performed by all the members of the Project (not just Maintainers and Committers). Members can review code changes and share their opinion by comments with the following principles:
* Discuss code; never discuss the code's author.
* Respect and acknowledge contributions, suggestions, and comments.
* Listen and be open to all different opinions.
* Help each other.

Changes are submitted via pull requests and only the Maintainers and Committers should approve or reject the pull request.
Changes should be reviewed in reasonable amount of time. Maintainers and Committers should leave changes open for some time (at least 1 full business day) so others can offer feedback. Review times increase with the complexity of the review.


#### 6. Skeleton Code
Skeleton for normal function

```js
var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');
// DO NOT declare user's global variable
// It will be shared among all instances
 
/**
 * Constructor called during creating the instance
 * @param {type} params
 * @returns {nm$_skeleton-function.SkeletonFunction}
 */
function SkeletonFunction(params) {
    kangaBaseNode.call(this, params);
    // Use 'this' keyward to share with prototype methods such as _execute()
    // var foo='a'
    // It is only local variable under SkeletonFunction()
    // this.foo='a'
    // User can use this.foo in prototype methods
}
extend(SkeletonFunction, kangaBaseNode);
/**
 * Callback whenever an event is reached
 * @returns {nm$_skeleton-function.SkeletonFunction.event}
 */
SkeletonFunction.prototype._execute = function () {
    switch (this.eventType) {
        case KANGA_EVENT.DATA:
            this.klogger.debug('Skeleton Function _execute() :Kanga Event Type is DATA');
            // User's code is here
            break;
        case KANGA_EVENT.COLLECTION:
            this.klogger.debug('Skeleton Function _execute() :Kanga Event Type is COLLECTION');
            // User's code is here
            break;
        case KANGA_EVENT.TIME_TICK:
            this.klogger.debug('Skeleton Function _execute() :Kanga Event Type is TIME_TICK');
            // User's code is here
            break;
        case KANGA_EVENT.EOF:
            this.klogger.debug('Skeleton Function _execute() :Kanga Event Type is EOF');
            // User's code is here
            break;
        case KANGA_EVENT.SYSTEM_LOG:
            this.klogger.debug('Skeleton Function _execute() :Kanga Event Type is SYSTEM_LOG');
            // User's code is here
            break;
        default:
            this.klogger.debug('Skeleton Function _execute() :Kanga Event Type is UNKNOWN');           
            //return null; if user do not want to emit this event
            break;
    }   
    return this.event;
    //return null; if user does not want to emit this event   
};
module.exports = SkeletonFunction;

```


Skeleton for spout

```js
var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');
// DO NOT declare user's global variable
// It will be shared among all instances
/**
 * Constructor called during creating the instance
 * @param {type} params
 * @returns {nm$_skeleton-spout.SkeletonSpout}
 */
function SkeletonSpout(params) {
    kangaBaseNode.call(this, params);
    // Use 'this' keyward to share with prototype methods such as _execute()
    // var foo='a'
    // It is only local variable under SkeletonFunction()
    // this.foo='a'
    // User can use this.foo in prototype methods
}
extend(SkeletonSpout, kangaBaseNode);
SkeletonSpout.prototype.generateEvents = function (kangaEmitter, isClone) {
    var self = this;
    var data = 'input data from external source'; 
     
    self.klogger.debug('Skeleton Spout generateEvents() : raw data ' + data);   
     
    // Adjust external data into kanga event structure which is json format
    var event = new Object();
    var root = new Object();
    var header = new Object();
    header.log = "";
    header.type = KANGA_EVENT.DATA;
    header.timestamp = new Date().getTime();
    header.name = self.outputName;
    root._header_ = header;
    var message = JSON.parse(data);
    root[header.name] = message;
    event.root = root;
 
    kangaEmitter(event, isClone);
    self.setReceivedCount();
}
module.exports = SkeletonSpout;
```
