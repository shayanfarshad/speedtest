import { Toast } from 'native-base';


export function addCommas(x) {
    return x.toString()
    // .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


export default function AppAlert(status,text, duration){
    function returnColor(status){
        switch (status) {
            case 'alert':
                return 'rgba(226, 152, 17, 0.87)';

            case 'err':
                return 'rgba(226, 46, 17, 0.87)';

            case 'info':
                return 'rgba(17, 149, 226, 0.87)';
            case 'ok':
            default:
                return 'rgba(33, 185, 37, 0.78)';
        }
    }
    Toast.show({
        text: text,
        duration: duration ? duration : 3000,
        textStyle:{fontFamily: 'IRANSansWeb(FaNum)',textAlign: 'right'},
        style:{
            backgroundColor: returnColor(status)
        }
      })
}