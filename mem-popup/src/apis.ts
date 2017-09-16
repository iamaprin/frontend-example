/**
 * @author iamaprin
 */
import { Ajax } from './ajax';
import { memPopupEntity } from './entity';

/**
 * 获取部门列表（树形结构数据）
 * @returns {Promise<memPopupEntity.TreeNode<number>>}
 */
export function listDepts() : Promise<memPopupEntity.TreeNode<number>> {
    return new Ajax().get('./data/tree-depts.json');
}

export function getMemByDept(): Promise<memPopupEntity.MemberResp[]> {
    return new Ajax().get('./data/members.json')
}

