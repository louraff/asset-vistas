export default function HighestLossAssetCard({ ticker, value }) {
    return (
      <div>
        <h2>Highest Loss </h2>
        <h3>{ticker}</h3>
        <h2>{value}</h2>
      </div>
    );
  }