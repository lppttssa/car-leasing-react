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
    isDisables: boolean,
};

export const Slider = (props: SliderProps) => {
    const {
        text, value, minValue, maxValue, handleInputChange, measureUnit, isPercentageUnit, percentValue, isDisables
    } = props;

    return  (
      <div className='slider-container'>
          <span className='field-description'>{text}</span>
          <div className={'slider-block' + (isPercentageUnit ? ' slider-block-small-paddings' : '')}>
              <div className='chosen-value-container'>
                  {isPercentageUnit ?
                      <span className='chosen-value'>{value.toLocaleString()}</span> :
                      <input type='text' className='chosen-value'
                             value={value.toLocaleString()} onChange={handleInputChange} disabled={isDisables}/>
                  }
                  {!isPercentageUnit ?
                      <span className='chosen-value'>{measureUnit}</span> :
                      <span className='chosen-value chosen-value-percentage'>
                          <input type='number' className='chosen-value percentage-input'
                                   value={percentValue} onChange={handleInputChange} disabled={isDisables}/>
                                   %
                      </span>
                  }
              </div>
              <input type="range" min={minValue} max={maxValue} value={isPercentageUnit ? percentValue : value}
                     className="slider" id="myRange" onInput={handleInputChange} disabled={isDisables}/>
          </div>
      </div>
    );
};