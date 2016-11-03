/* Copyright 2015-2016 Samsung Electronics Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var KANGA_EVENT_TYPE = {    
    RAW: -1,        // Raw string  with Kanga's header
    DATA: 0,        // A json for single event with Kanga's header
    COLLECTION: 1,  // A json array multiple event with Kanga's header
    TIME_TICK: 2,   // Time event without message
    EOF: 3,         // EOF event without message
    SYSTEM_LOG: 4,  // System log without message
    NONE: 99        // Default
};
module.exports = KANGA_EVENT_TYPE;