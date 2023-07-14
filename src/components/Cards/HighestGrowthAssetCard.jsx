import "../css/Cards.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'

export default function HighestGrowthAssetCard({ ticker, value }) {
  return (
    <div className="asset-card">
      <div className="roww">
        <div className="col-icon">
          <FontAwesomeIcon icon={faChartLine} className="asset-icon growth"/>
        </div>
        <div className="col-info">
          <p className="ticker">{ticker}</p>
          <h2 className="value">{parseFloat(value).toFixed(2)}</h2>
        </div>
      </div>
      <hr className="divider"/>
      <div className="row">
        <h2 className="card-title">Highest Growth</h2>
      </div>
    </div>
  );
}
