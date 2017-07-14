/**
 * @author iamaprin
 */

import $ = require('jquery')
import * as ajax from './ajax'

export function listDepts() : JQuery.jqXHR<ajax.ApiResponse> {
	return $.getJSON('./data/tree-dept.json');
}

