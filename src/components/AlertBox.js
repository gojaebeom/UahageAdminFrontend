import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from "react-redux";

export default function AlertBox(){
    const alterMessage = useSelector(state => state.alterMessage);
    
    return (
    <Snackbar open={alterMessage.isOpen} autoHideDuration={alterMessage.timer}>
        <Alert severity={alterMessage.messageType}>
            {alterMessage.message}
        </Alert>
    </Snackbar>
    )
}