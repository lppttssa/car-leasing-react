import './CountingPage.scss';
import {Slider} from "../Slider/Slider";
import {useState} from "react";
import {TotalAmount} from "../TotalAmount/TotalAmount";
import {getValue} from "../../functions";
import {Button} from "../Button/Button";
import useWindowDimensions from "../../hooks";

const MIN_CAR_PRICE = 1000000;
const MAX_CAR_PRICE = 6000000;

const MIN_DEPOSIT = 10;
const MAX_DEPOSIT = 60;

const MIN_MONTH_NUMBER = 1;
const MAX_MONTH_NUMBER = 60;

const API_URL = 'https://eoj3r7f3r4ef6v4.m.pipedream.net';

export const CountingPage = ():JSX.Element => {
    const [carPrice, setCarPrice] = useState(3300000);
    const [deposit, setDeposit] = useState(13);
    const [monthNumber, setMonthNumber] = useState(60);
    const [isLoading, setLoading] = useState(false);
    const [timer, setTimer] = useState(null);

    const { width } = useWindowDimensions();

    const postData = async () => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: carPrice,
                initial: Math.floor(deposit/100*carPrice),
                period: monthNumber,
                sum: deposit/100 * carPrice + monthNumber * getMonthPayment(),
                monthPayment: getMonthPayment(),
            }),
        })
        return response.json();
    };

    const handleCarPriceChange = (e: any) => {
        const value = +e.target.value.replace(/\s/g, '');
        setCarPrice(value)
        if (e.type === 'change') {
            // @ts-ignore
            clearTimeout(timer);
            // @ts-ignore
            setTimer(setTimeout(() => {
                setCarPrice(getValue(value, MIN_CAR_PRICE, MAX_CAR_PRICE));
            }, 800));
        }
    };

    const handleDepositChange = (e: any) => {
        const value = e.target.value;
        setDeposit(value)
        if (e.type === 'change') {
            // @ts-ignore
            clearTimeout(timer);
            // @ts-ignore
            setTimer(setTimeout(() => {
                setDeposit(getValue(value, MIN_DEPOSIT, MAX_DEPOSIT));
            }, 800));
        }
    };

    const handleMonthNumberChange = (e: any) => {
        const value = e.target.value;
        setMonthNumber(value)
        if (e.type === 'change') {
            // @ts-ignore
            clearTimeout(timer);
            // @ts-ignore
            setTimer(setTimeout(() => {
                setMonthNumber(getValue(value, MIN_MONTH_NUMBER, MAX_MONTH_NUMBER));
            }, 800));
        }
    };

    const getMonthPayment = () => {
        return (carPrice - deposit/100*carPrice) * ((0.035 * 1.035**monthNumber)/(1.035**monthNumber  - 1));
    };

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        postData()
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    };

    return (
        <div className='main-page'>
            <h1 className='main-title'>Рассчитайте стоимость автомобиля в лизинг</h1>
            <form onSubmit={handleFormSubmit}>
                <div className='sliders-container'>
                    <Slider text={width > 600 ? 'Стоимость автомобиля' : 'Желаемая сумма кредита'} value={carPrice} minValue={MIN_CAR_PRICE}
                            maxValue={MAX_CAR_PRICE} handleInputChange={handleCarPriceChange}
                            measureUnit='₽' isDisabled={isLoading}/>
                    <Slider text='Первоначальный взнос' value={Math.floor(deposit / 100 * carPrice)}
                            percentValue={deposit} minValue={MIN_DEPOSIT} maxValue={MAX_DEPOSIT}
                            handleInputChange={handleDepositChange} measureUnit='%' isPercentageUnit
                            isDisabled={isLoading}/>
                    <Slider text='Срок лизинга' value={monthNumber} minValue={MIN_MONTH_NUMBER}
                            maxValue={MAX_MONTH_NUMBER} handleInputChange={handleMonthNumberChange}
                            measureUnit='мес.' isDisabled={isLoading}/>
                </div>
                <div className='totals-container'>
                    <TotalAmount text='Сумма договора лизинга' sum={deposit/100 * carPrice + monthNumber * getMonthPayment()}/>
                    <TotalAmount text='Ежемесячный платеж от' sum={getMonthPayment()}/>
                    <Button isLoading={isLoading}/>
                </div>
            </form>
        </div>
    );
}