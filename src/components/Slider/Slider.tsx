import './Slider.scss'
import '../CountingPage/CountingPage.scss';

type SliderProps = {
    text: string,
    value: number,
    mimValue: number,
    maxValue: number,
    handleInputChange: (event: any) => void,
    measureUnit: string,
    isPercentageUnit?: boolean,
    percentValue?: number,
};

export const Slider = (props: SliderProps) => {
    const {
        text, value, mimValue, maxValue, handleInputChange, measureUnit, isPercentageUnit, percentValue,
    } = props;

    return  (
      <div className='slider-container'>
          <span className='field-description'>{text}</span>
          <div className={'slider-block' + (isPercentageUnit ? ' slider-block-small-paddings' : '')}>
              <div className='chosen-value-container'>
                  {isPercentageUnit ?
                      <span className='chosen-value'>{value}</span> :
                      <input type='text' className='chosen-value'
                             value={value} onChange={handleInputChange}/>
                  }
                  {!isPercentageUnit ?
                      <span className='chosen-value'>{measureUnit}</span> :
                      <span className='chosen-value chosen-value-percentage'>
                          <input type='text' className='chosen-value percentage-input'
                                   value={percentValue} onChange={handleInputChange}/>
                                   %
                      </span>
                  }
              </div>
              <input type="range" min={mimValue} max={maxValue} value={isPercentageUnit ? percentValue : value}
                     className="slider" id="myRange" onInput={handleInputChange}/>
          </div>
      </div>
    );
};