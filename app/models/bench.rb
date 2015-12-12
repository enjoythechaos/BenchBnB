class Bench < ActiveRecord::Base
  def self.in_bounds(bounds)
    Bench.all
        .where(lat: bounds["southWest"]["lat"]..bounds["northEast"]["lat"])
        .where(lng: bounds["southWest"]["lng"]..bounds["northEast"]["lng"])
  end
end
