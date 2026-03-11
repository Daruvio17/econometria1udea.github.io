// ===== FUNCIÓN PARA CAMBIAR PESTAÑAS (GLOBAL) =====
function showTab(tabId, saveHistory = true) {
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
        tab.style.display = 'none';
    });

    const target = document.getElementById(tabId);
    if(target) {
        target.style.display = 'block';
        setTimeout(() => {
            target.classList.add('active');
        }, 10);
        
        if (window.MathJax) {
            window.MathJax.typesetPromise ? window.MathJax.typesetPromise() : window.MathJax.typeset();
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // GESTIÓN DEL HISTORIAL MEJORADA
        if (saveHistory) {
            // Si el ID es diferente al que ya está en el historial, lo guardamos
            if (!history.state || history.state.tabId !== tabId) {
                history.pushState({ tabId: tabId }, "", "#" + tabId);
            }
        }
    }
}

// ===== ESCUCHAR NAVEGACIÓN (EL ARREGLO DEFINITIVO) =====
window.addEventListener('popstate', function(event) {
    // Si hay un estado guardado (tabId), vamos a él
    if (event.state && event.state.tabId) {
        showTab(event.state.tabId, false);
    } else {
        // IMPORTANTE: Si volvemos al origen (donde no hay estado), 
        // forzamos la pestaña de inicio en lugar de dejar que Google salga
        showTab('inicio', false);
    }
});

// ===== CONTROL DE CARGA INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    // ... (Mantén aquí tu código del menú mobile y animaciones) ...

    // ARREGLO PARA EL BOTÓN ATRÁS:
    // Al entrar, definimos que el estado actual es 'inicio' (o el hash que traiga la URL)
    const initialTab = window.location.hash.replace('#', '') || 'inicio';
    
    // Esto "marca" la entrada en el historial para que 'atrás' sepa qué es lo primero que vimos
    history.replaceState({ tabId: initialTab }, "", window.location.hash || "#inicio");
    
    // Mostramos la pestaña inicial sin crear un duplicado en el historial
    showTab(initialTab, false);

    // ... (Mantén aquí el código de las skill bars) ...
});
