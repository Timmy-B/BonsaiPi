// Core Components
import Toolbar from '@/components/core/Toolbar.vue';
import Navigation from '@/components/core/NavigationDrawer.vue';
import LiveChart from '@/components/LiveChart.vue';
import Camera from '@/components/Camera.vue';
import Info from '@/components/Info.vue';
import Calender from '@/components/Calender.vue';




function setupComponents(Vue){
  Vue.component('toolbar', Toolbar);
  Vue.component('navigation', Navigation);
  Vue.component('livechart', LiveChart);
  Vue.component('camera', Camera);
  Vue.component('info', Info);
  Vue.component('calender', Calender);

}


export {
  setupComponents
}
