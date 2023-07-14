import "../css/Cards.css"

export default function HighestLossAssetCard({ ticker, value }) {
    return (
      <div className="asset-card loss">
        <h2 className="asset-card">Highest Loss </h2>
        <h3 className="asset-card ticker">{ticker}</h3>
        <h2 className="asset-card value">{value}</h2>
      </div>
    );
  }