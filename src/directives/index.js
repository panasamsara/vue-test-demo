// 自定义指令
 
import draggable from '@/directives/draggable'; // 可拖拽指令
import selectScrollLoad from '@/directives/selectScrollLoad'; // 下拉加载指令
import tableScrollLoad from '@/directives/tableScrollLoad'; // 下拉加载指令
 
export default app => {
  app.directive('draggable', draggable)
  app.directive('selectScrollLoad', selectScrollLoad)
  app.directive('tableScrollLoad', tableScrollLoad)
}
