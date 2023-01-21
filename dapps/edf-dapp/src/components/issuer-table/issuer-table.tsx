import dayjs from 'dayjs';
import React ,{useState} from 'react';
import { Label } from '../label/label';

const IssuerTable = ({onClick,}) => {

    const [list, setList] = useState([]);
    function truncateStr(source, start= 4, end=4) {
        if (!source) {
            return source;
        }
        const len = source.length;
        if (len <= start + end) {
            return source;
        }
        return `${source.substring(0, start)}...${source.substring(len - end)}`;
    }
    
    const formatDate = (date)=> {
        return date ? (dayjs as any).utc(date).format('hh:mm:ss (UTC) DD MMM YYYY') : null;
    }
  return (
    <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">State</th>
                        <th scope="col">Holder</th>
                        <th scope="col">Issued by</th>
                        <th scope="col">Valid until</th>
                        <th scope="col">VC ID</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {list.length &&
                        list.map((item, i) => {
                            return <tr key={'tr-'+i}>
                                <th><Label name={item.active ? 'Active' : 'Deactivated'} color={item.active ? 'success' : 'danger'}></Label></th>
                                <td>{truncateStr(item.did, 27)}</td>
                                <td>{formatDate(item.createDate)}</td>
                                <td>{item.active ? '-' : formatDate(item.deactivateDate)}</td>
                                <td>{item.vcId}</td>
                                <td>
                                    <button className="button primary button-sm me-2" onClick={onClick}>Revoke</button>
                                </td>
                            </tr>
                        })}
                </tbody>
            </table>
  )
}

export default IssuerTable


