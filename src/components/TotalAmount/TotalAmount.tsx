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
            <div className='price-container'>
                <span className='main-title total-sum total-sum-number'>{sum ? Math.floor(sum).toLocaleString() : 'Ошибка!'}</span>
                <span className='main-title total-sum total-sum-measure'>₽</span>
            </div>
        </div>
    );

};