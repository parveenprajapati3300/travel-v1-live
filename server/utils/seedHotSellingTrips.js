import HotSellingTrip from '../models/HotSellingTrip.js'

export const hotSellingTrips = [
  {
    name: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80',
    price: 11999,
    isActive: true,
  },
  {
    name: 'Manali',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80',
    price: 14999,
    isActive: true,
  },
  {
    name: 'Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80',
    price: 16999,
    isActive: true,
  },
  {
    name: 'Kashmir',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=80',
    price: 24999,
    isActive: true,
  },
  {
    name: 'Andaman',
    image: 'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=900&q=80',
    price: null,
    isActive: true,
  },
]

const seedHotSellingTrips = async () => {
  const results = await Promise.all(
    hotSellingTrips.map((trip) =>
      HotSellingTrip.findOneAndUpdate(
        { name: trip.name },
        trip,
        { returnDocument: 'after', runValidators: true, upsert: true },
      ),
    ),
  )

  return results
}

export default seedHotSellingTrips
