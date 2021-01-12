import { Review } from './models/review.js'
import { Vendor } from './models/vendor.js'

function logReqInfo(typeStr, params) {
    console.log(Date().toLocaleString())
    console.log(`  Type: ${typeStr}`)
    console.log(`  Params: ${JSON.stringify(params)}`)
}

export const resolvers = {
    Query: {
        reviews: (_, opts = { vendor_name }, __, ___) => {
            logReqInfo('Query: reviews', opts)
            const res = Review.find(
                { 'vendor_name': opts.vendor_name },
                'reviewer_name id vendor_name review_date review_body likes dislikes quality selection cost_to_value shipping customer_service'
            )
            return res
        },
        vendors: (_, __, ___, ____) => {
            logReqInfo('Query: vendors')
            const res = Vendor.find()
            return res
        },
        review: (_, { id }, __, ___) => {
            logReqInfo('Query: review', id)
            const res = Review.findOne(
                { 'id': id },
                'reviewer_name id vendor_name'
            )
            return res
        },
        allreviews: (_, __, ___, ____) => {
            logReqInfo('Query: allreviews')
            const res = Review.find();
            return res
        },
        distinctShippingOrigins: (_, __, ___, ____) => {
            logReqInfo('Query: distinctShippingOrigins')
            const res = Vendor.distinct("shippingOrigin")
            return res
        },
        distinctProductTypes: (_, __, ___, ____) => {
            logReqInfo('Query: distinctProductTypes')
            const res = Vendor.distinct("productTypes")
            return res
        },
        distinctKnownFor: (_, __, ___, ____) => {
            logReqInfo('Query: distinctKnownFor')
            const res = Vendor.distinct("knownFor")
            return res
        },
        vendorsWithFilters: (_, opts = { productTypes, shippingOrigin, knownFor, offersSamples, style }, __, ___) => {
            logReqInfo(`Query: vendorsWithFilters`, opts)
            var queryOpts = {}
            if (opts.productTypes !== undefined) { queryOpts['productTypes'] = { '$all': opts.productTypes } }
            if (opts.shippingOrigin !== undefined) { queryOpts['shippingOrigin'] = { '$in': opts.shippingOrigin } }
            if (opts.knownFor !== undefined) {queryOpts['knownFor'] = { '$in': opts.knownFor }}
            if (opts.offersSamples !== undefined) {queryOpts['offersSamples'] = opts.offersSamples ? true : undefined}
            if (opts.style !== undefined) {queryOpts['style'] = opts.style}

            const res = Vendor.find(
                queryOpts,
                'id name abbreviation url logoUrl shippingOrigin style description offersSamples knownFor productTypes'
            )
            return res
        }
    },
    Mutation: {
        updateLikeDislike: (_, opts = {id, isLike, add}, __, ___) => {
            logReqInfo('Mutation: updateLikeDislike', opts)
            var updateOpts = {}
            if (opts.isLike && opts.add) updateOpts['$inc'] = { 'likes': 1 }
            else if (opts.isLike && !opts.add) updateOpts['$dec'] = { 'likes': 1 }
            else if (!opts.isLike && opts.add) updateOpts['$inc'] = { 'dislikes': 1 }
            else if (!opts.isLike && !opts.add) updateOpts['$dec'] = { 'dislikes': 1 }

            const q = Review.where({ 'id': Number(opts.id) })
            q.update(updateOpts).exec()
        },
        createReview: async (_, opts = { reviewer_name, vendor_name, review_body, quality, selection, cost_to_value, shipping, customer_service }, __, ___) => {
            logReqInfo('Mutation: createReview', opts)
            const id = Date.now()
            const date = Date().toString()
            const newReview = new Review({
                id,
                likes: 0,
                dislikes: 0,
                review_date: date,
                ...opts
            })
            await newReview.save()
            return newReview
        },
        createVendor: async(_, opts = { name, abbreviation, url, logoUrl, shippingOrigin, shippingRange, style, description, offersSamples, knownFor, productTypes}, __, ___) => {
            logReqInfo('Mutation: createVendor', opts)
            const id = Date.now()
            const newVendor = new Vendor({
                ...opts
            })
            await newVendor.save()
            return newVendor
        }
    }
}