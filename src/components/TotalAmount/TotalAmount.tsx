import './TotalAmount.scss';
import '../CountingPage/CountingPage.scss';

type TotalAmountProps = {
  text: string,
  sum: number,
};

export const TotalAmount = (props: TotalAmountProps) => {
    const {
        text,
        sum
    } = props;

    return (
        <div className='total-amount-container'>
            <span className='field-description total-amount-description'>{text}</span>
            <span className='main-title total-sum'>{Math.floor(sum)}</span>
        </div>
    );

};