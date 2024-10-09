const getProduct = async (req: any, res: any) => {
    try {
        res.status(200).json({
            message: 'Get Products Successfully',
            data: []
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
}

export { getProduct }