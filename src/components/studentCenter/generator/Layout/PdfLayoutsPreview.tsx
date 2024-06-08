import Grid from '@mui/material/Grid';
import PdfTemplate1Preview from './resumeLayouts/template_1/preview/PdfTemplate1Preview';

const PdfLayoutsPreview = () => {
    return (
        <div style={{ width: '80%', flexGrow: '1'}}>
            <Grid container spacing={2}>
                <Grid sx={{ background: 'green', width: 'fit-content' }} item xs={6}>
                    <PdfTemplate1Preview />
                </Grid>
                <Grid item xs={6}>
                    <div style={{ background: 'red'}}>test</div>
                </Grid>
            </Grid>
        </div>

    )
}

export default PdfLayoutsPreview;