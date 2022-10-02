import './CountingPage.scss';
import {Slider} from "../Slider/Slider";
import {useState} from "react";
import {TotalAmount} from "../TotalAmount/TotalAmount";

const MIN_CAR_PRICE = 1000000;
const MAX_CAR_PRICE = 6000000;

const MIN_DEPOSIT = 10;
const MAX_DEPOSIT = 60;

const MIN_MONTH_NUMBER = 1;
const MAX_MONTH_NUMBER = 60;

export const CountingPage = ():JSX.Element => {
    const [carPrice, setCarPrice] = useState(3300000);
    const [deposit, setDeposit] = useState(13);
    const [monthNumber, setMonthNumber] = useState(60);

    const handleCarPriceChange = (e: any) => {
        setCarPrice(e.target.value)
    };

    const handleDepositChange = (e: any) => {
        setDeposit(e.target.value);
    };

    const handleMonthNumberChange = (e: any) => {
        setMonthNumber(e.target.value);
    };

    const getMonthPayment = () => {
        return (carPrice - deposit/100*carPrice) * ((0.035 * 1.035**monthNumber)/(1.035**monthNumber  - 1));
    };

    return (
        <div className='main-page'>
            <h1 className='main-title'>Рассчитайте стоимость автомобиля в лизинг</h1>
            <form>
                <div className='sliders-container'>
                    <Slider text='Стоимость автомобиля' value={carPrice} mimValue={MIN_CAR_PRICE}
                            maxValue={MAX_CAR_PRICE} handleInputChange={handleCarPriceChange}
                            measureUnit='₽'/>
                    <Slider text='Первоначальный взнос' value={Math.floor(deposit / 100 * carPrice)}
                            percentValue={deposit} mimValue={MIN_DEPOSIT} maxValue={MAX_DEPOSIT}
                            handleInputChange={handleDepositChange} measureUnit='%' isPercentageUnit/>
                    <Slider text='Срок лизинга' value={monthNumber} mimValue={MIN_MONTH_NUMBER}
                            maxValue={MAX_MONTH_NUMBER} handleInputChange={handleMonthNumberChange}
                            measureUnit='мес.'/>
                </div>
                <div className='totals-container'>
                    <TotalAmount text='Сумма договора лизинга' sum={deposit/100 * carPrice + monthNumber * getMonthPayment()}/>
                    <TotalAmount text='Ежемесячный платеж от' sum={getMonthPayment()}/>
                    <button className='btn-send'>Оставить заявку</button>
                </div>
            </form>
        </div>
    );
}