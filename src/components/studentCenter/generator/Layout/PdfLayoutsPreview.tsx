import Grid from '@mui/material/Grid';
import PdfTemplate1Preview from './resumeLayouts/template_1/preview/PdfTemplate1Preview';
import PdfTemplate2Preview from './resumeLayouts/template_2/preview/PdfTemplate2Preview';

type LayoutPreviewProps = {
    setLayoutID: React.Dispatch<React.SetStateAction<string>>;
}

const PdfLayoutsPreview = ({ setLayoutID }: LayoutPreviewProps) => {
    return (
        <div style={{ flexGrow: '1' }} id='div-MY2'>
            <Grid container direction="row" justifyContent="center"  spacing={6} data-test-id={'grid-container-layout-preview'} sx={{ marginTop: '0' }}>
                <Grid item xs={12} md={6} sx={{ width: 'fit-content', padding: '0', display: 'flex', justifyContent: 'center' }} >
                    <PdfTemplate1Preview setLayoutID={setLayoutID} />
                </Grid>
                <Grid item xs={12} md={6} sx={{ width: 'fit-content', padding: '0', display: 'flex', justifyContent: 'center' }} >
                    <PdfTemplate2Preview setLayoutID={setLayoutID} />
                </Grid>
            </Grid>
        </div>

    )
}

export default PdfLayoutsPreview;