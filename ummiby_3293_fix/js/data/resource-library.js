// Global study-resource library shared across Ummiby Companion modules.
export const resourceLibrary = {
  "version": "1.0.0",
  "resources": []
};

export function resourceById(id){ return resourceLibrary.resources.find(resource=>resource.id===id) || null; }
export function resourcesByIds(ids=[]){ return ids.map(resourceById).filter(Boolean); }
