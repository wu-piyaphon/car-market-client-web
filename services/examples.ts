/**
 * Services Usage Examples
 * How to use the services in different parts of your app
 */

// ====================================
// SERVER COMPONENT EXAMPLES
// ====================================

/**
 * Example: Cars listing page (Server Component)
 */
/*
import { getCarsCache } from '@/services'

export default async function CarsPage() {
  // This data is fetched on the server and cached
  const cars = await getCarsCache({ page: 1, limit: 20 })
  
  return (
    <div>
      {cars.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  )
}
*/

/**
 * Example: Car detail page (Server Component)
 */
/*
import { getCarByIdCache } from '@/services'

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const car = await getCarByIdCache(params.id)
  
  return (
    <div>
      <h1>{car.make} {car.model}</h1>
      <p>Price: ${car.price}</p>
    </div>
  )
}
*/

// ====================================
// SERVER ACTION EXAMPLES
// ====================================

/**
 * Example: Server action for form submission
 */
/*
'use server'

import { submitContactForm } from '@/services'
import { redirect } from 'next/navigation'

export async function contactAction(formData: FormData) {
  const result = await submitContactForm({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  })
  
  if (result.success) {
    redirect('/contact/success')
  } else {
    return { error: result.error }
  }
}
*/

/**
 * Example: Server action for valuation
 */
/*
'use server'

import { calculateValuation } from '@/services'

export async function valuationAction(formData: FormData) {
  const result = await calculateValuation({
    make: formData.get('make') as string,
    model: formData.get('model') as string,
    year: parseInt(formData.get('year') as string),
    mileage: parseInt(formData.get('mileage') as string),
    condition: formData.get('condition') as 'excellent' | 'good' | 'fair' | 'poor',
  })
  
  return result
}
*/

// ====================================
// CLIENT COMPONENT EXAMPLES
// ====================================

/**
 * Example: Client component with useTransition for server action
 */
/*
'use client'

import { useTransition } from 'react'
import { calculateValuation } from '@/services'

export function ValuationForm() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState(null)

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await calculateValuation({
        make: formData.get('make') as string,
        model: formData.get('model') as string,
        year: parseInt(formData.get('year') as string),
        mileage: parseInt(formData.get('mileage') as string),
        condition: formData.get('condition') as any,
      })
      
      setResult(result)
    })
  }

  // Form JSX would go here...
}
*/

// ====================================
// GROUPED IMPORTS EXAMPLE
// ====================================

/**
 * Example: Using grouped service imports
 */
/*
import { CarsService, ValuationService } from '@/services'

// Use specific service functions
const cars = await CarsService.getCars()
const valuation = await ValuationService.calculateValuation(data)
*/

// ====================================
// DIRECT IMPORTS EXAMPLE
// ====================================

/**
 * Example: Direct function imports (cleaner)
 */
/*
import { getCars, calculateValuation, submitContactForm } from '@/services'

// Use functions directly
const cars = await getCars()
const valuation = await calculateValuation(data)
const contact = await submitContactForm(data)
*/
