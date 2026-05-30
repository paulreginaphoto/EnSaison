import { MapPin } from "lucide-react";

export function LocationSelector() {
  return (
    <label className="control-shell" aria-label="Région">
      <MapPin aria-hidden="true" className="h-4 w-4 text-sage-700" />
      <select className="control-select" value="Lausanne" disabled>
        <option>Lausanne</option>
      </select>
    </label>
  );
}
