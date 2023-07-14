import "../css/Cards.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'

export default function HighestGrowthAssetCard({ ticker, value }) {
    return (
      <div className="asset-card growth">
        <div className="asset-card-header">
          <FontAwesomeIcon icon={faChartLine} />
          <h2 className="asset-card">Highest Growth</h2>
        </div>
        <div className="asset-card-body">
          <div className="asset-row">
            <div className="asset-row-1">
              <div className="info-icon">
              </div>
              <div className="asset-row-2">
                <div className="numbers">
        <p className="asset-card ticker">{ticker}</p>
        <h3 className="asset-card value">{value}</h3>
        </div>
        </div>
        </div>
        </div>
      </div>
      </div>
    );
  }
