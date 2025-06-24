
-- Fix the trigger function to use the correct column name
CREATE OR REPLACE FUNCTION public.update_gallery_count()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE public.projects 
  SET gallery_image_paths = (
    SELECT ARRAY_AGG(image_url ORDER BY order_index)
    FROM public.project_gallery 
    WHERE project_id = COALESCE(NEW.project_id, OLD.project_id)
  ),
  gallery_image_count = (
    SELECT COUNT(*)
    FROM public.project_gallery 
    WHERE project_id = COALESCE(NEW.project_id, OLD.project_id)
  )
  WHERE id = COALESCE(NEW.project_id, OLD.project_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS gallery_count_trigger ON public.project_gallery;
CREATE TRIGGER gallery_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.project_gallery
  FOR EACH ROW EXECUTE FUNCTION update_gallery_count();

-- Now add the gallery image to the colourful-containers project
INSERT INTO public.project_gallery (
  project_id,
  image_url,
  title,
  description,
  order_index
)
SELECT 
  id,
  '/images/projects/colourful-containers/gallery-1.jpg',
  'Gallery Image 1',
  'Project showcase image',
  1
FROM public.projects 
WHERE slug = 'colourful-containers';
