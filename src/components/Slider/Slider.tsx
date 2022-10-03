import './Slider.scss'
import '../CountingPage/CountingPage.scss';

type SliderProps = {
    text: string,
    value: number,
    minValue: number,
    maxValue: number,
    handleInputChange: (event: any) => void,
    measureUnit: string,
    isPercentageUnit?: boolean,
    percentValue?: number,
    isDisabled: boolean,
};

export const Slider = (props: SliderProps) => {
    const {
        text, value, minValue, maxValue, handleInputChange, measureUnit, isPercentageUnit, percentValue, isDisabled
    } = props;

    return  (
      <div className='slider-container'>
          <span className='field-description'>{text}</span>
          <div className={'slider-block' + (isPercentageUnit ? ' slider-block-small-paddings' : '') +
          (isDisabled ? ' slider-disabled' : '')}>
              <div className='chosen-value-container'>
                  {isPercentageUnit ?
                      <span className='chosen-value'>{value.toLocaleString()}</span> :
                      <input type='text' className='chosen-value input-element'
                             value={value.toLocaleString()} onChange={handleInputChange} disabled={isDisabled}/>
                  }
                  {!isPercentageUnit ?
                      <span className='chosen-value'>{measureUnit}</span> :
                      <span className='chosen-value chosen-value-percentage'>
                          <input type='number' className='chosen-value percentage-input'
                                   value={percentValue} onChange={handleInputChange} disabled={isDisabled}/>
                                   %
                      </span>
                  }
              </div>
              <input type="range" min={minValue} max={maxValue} value={isPercentageUnit ? percentValue : value}
                     className="slider" id="myRange" onInput={handleInputChange} disabled={isDisabled}/>
          </div>
      </div>
    );
};