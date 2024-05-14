import ToastPlugin, {useToast} from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

export const toast = useToast({
    position: 'top-right'
})

export default ToastPlugin